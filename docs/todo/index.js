import { getNode } from './todo.template.js';
import initState from '../common/state.js';
const state = initState({
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
function getCountString(count) {
    if (count > 1) {
        return `${count} items left`;
    }
    else if (count === 1) {
        return `Only 1 item left`;
    }
    return '';
}
function prepTasks(tasks, show) {
    return tasks
        .filter(task => (show == 'all') || (show == 'active' && !task.completed) || (show === 'completed' && task.completed))
        .map((task, i) => (Object.assign(Object.assign({}, task), { removeId: `remove_${i}`, completedId: `complete_${i}` })));
}
export function initApp() {
    var _a, _b;
    const form = app.set.taskForm;
    form.onsubmit = () => false;
    form.addEventListener('change', evt => {
        const source = evt.target;
        const sourceId = source.id;
        if (sourceId.indexOf('complete') === 0) {
            const copy = state.tasks.slice(0);
            const task = copy[+source.value];
            copy[+source.value] = { label: task.label, completed: !task.completed };
            state.tasks = copy;
        }
        else if (sourceId.indexOf('remove_') === 0) {
            const copy = state.tasks.slice(0);
            copy.splice(+source.value, 1);
            state.tasks = copy;
        }
        else if (source.name === 'filter') {
            state.show = source.value;
        }
    });
    const taskField = app.set.taskField;
    taskField.addEventListener('keyup', (evt) => {
        if (evt.key === 'Enter') {
            state.tasks = [{ label: taskField.value, completed: false }, ...state.tasks];
            taskField.value = '';
        }
    });
    app.set.removeCompleted.addEventListener('click', () => {
        state.tasks = state.tasks.slice(0).filter((task) => !task.completed);
    });
    (_a = state.$) === null || _a === void 0 ? void 0 : _a.tasks.add(tasks => refresh(tasks, state.show));
    (_b = state.$) === null || _b === void 0 ? void 0 : _b.show.add(show => refresh(state.tasks, show));
    return app;
}
function refresh(tasks, show) {
    const filteredTasks = prepTasks(tasks, show);
    app.set.tasks = filteredTasks;
    app.set.count = getCountString(filteredTasks.length);
}
//# sourceMappingURL=index.js.map