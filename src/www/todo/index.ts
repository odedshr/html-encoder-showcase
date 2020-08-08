import { getNode } from './todo.template.js';
import initState, { State } from '../common/state.js';

type Task = { label: string; completed: boolean; removeId?: string; completedId?: string }
const state: State = initState({
  tasks: [{
    label: 'build application',
    completed: false,
  }, {
    label: 'stylise ui',
    completed: false,
  }, {
    label: 'add documentation',
    completed: false,
  }],
  show: 'all'
});


const app = getNode({
  count: getCountString(state.tasks.length), tasks: prepTasks(state.tasks, state.show)
});

function getCountString(count: number): any {
  if (count > 1) {
    return `${count} items left`;
  } else if (count === 1) {
    return `Only 1 item left`
  }
  return '';
}

function prepTasks(tasks: Task[], show: string): Task[] {
  return tasks
    .filter(task => (show == 'all') || (show == 'active' && !task.completed) || (show === 'completed' && task.completed))
    .map((task, i) => ({ ...task, removeId: `remove_${i}`, completedId: `complete_${i}` }));
}

export function initApp() {
  const form = app.set.taskForm as unknown as HTMLFormElement;
  form.onsubmit = () => false;
  form.addEventListener('change', evt => {
    const source = evt.target as HTMLInputElement;
    const sourceId = source.id;

    if (sourceId.indexOf('complete') === 0) {
      const copy = state.tasks.slice(0);
      const task: Task = copy[+source.value];
      copy[+source.value] = { label: task.label, completed: !task.completed };
      state.tasks = copy;
    } else if (sourceId.indexOf('remove_') === 0) {
      const copy = state.tasks.slice(0);
      copy.splice(+source.value, 1);
      state.tasks = copy;
    } else if (source.name === 'filter') {
      state.show = source.value;
    }
  });

  const taskField: HTMLInputElement = app.set.taskField as unknown as HTMLInputElement;
  taskField.addEventListener('keyup', (evt) => {
    if ((evt as KeyboardEvent).key === 'Enter') {
      state.tasks = [{ label: taskField.value, completed: false }, ...state.tasks];
      taskField.value = '';
    }
  });

  (app.set.removeCompleted as unknown as HTMLButtonElement).addEventListener('click', () => {
    state.tasks = state.tasks.slice(0).filter((task: Task) => !task.completed);
  });

  state.$?.tasks.add(tasks => refresh(tasks, state.show));
  state.$?.show.add(show => refresh(state.tasks, show));

  return app as Node;
}


function refresh(tasks: Task[], show: 'all' | 'active' | 'completed') {
  const filteredTasks = prepTasks(tasks, show);
  app.set.tasks = filteredTasks as any;
  app.set.count = getCountString(filteredTasks.length) as any;
}