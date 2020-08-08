type Index = string | number;
type Delegate = (newValue: any, newState: State, oldValue?: any) => void;
type IDelegateCollection = {
  add: (delegate: Delegate) => void;
  remove: (delegate: Delegate) => void;
  includes: (delegate: Delegate) => void;
  delegate: (newValue: any, obj: { [key in Index]: any }, oldValue: any) => void;
};
export type State = {
  [key in Index]: any;
} & {
  $?: {
    [key: string]: IDelegateCollection;
  };
};

const delegatesReference = '$';

class DelegateCollection {
  private delegates: Delegate[] = [];
  add(delegate: Delegate) {
    this.delegates.push(delegate);
  }

  remove(delegate: Delegate) {
    const index = this.delegates.indexOf(delegate);
    if (index > -1) {
      this.delegates.splice(index, 1);
    }
  }

  includes(delegate: Delegate) {
    return this.delegates.includes(delegate);
  }

  delegate(obj: State, newValue: any, oldValue: any) {
    this.delegates.forEach((delegate) => delegate(newValue, obj, oldValue));
  }
}

export default function initState(initial: State = {}): State {
  let delegates: { [key: string]: DelegateCollection } = Object.freeze({});

  const state: State = new Proxy(
    {},
    {
      get(obj: State, prop: Index) {
        return prop === delegatesReference ? delegates : Object.freeze(obj[prop]);
      },

      set(obj: State, prop: Index, value: any) {
        const oldValue = obj[prop];
        obj[prop] = value;
        obj = Object.freeze(Object.assign({}, obj));
        if (!delegates[prop]) {
          delegates = Object.freeze(Object.assign({}, delegates, { [prop]: new DelegateCollection() }));
        } else {
          delegates[prop].delegate(obj, value, oldValue);
        }
        return true;
      },

      deleteProperty(obj: State, prop: Index) {
        if (prop === delegatesReference) {
          return false;
        }
        delete obj[prop];
        return true;
      },
    }
  );

  for (let k in initial) {
    const value = initial[k];
    if (Array.isArray(value)) {
      state[k] = Array.from(value);
    } else if (typeof value === 'object') {
      state[k] = { ...value };
    } else {
      state[k] = value;
    }
  }

  return state;
}