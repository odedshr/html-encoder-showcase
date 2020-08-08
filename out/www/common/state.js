const delegatesReference = '$';
class DelegateCollection {
    constructor() {
        this.delegates = [];
    }
    add(delegate) {
        this.delegates.push(delegate);
    }
    remove(delegate) {
        const index = this.delegates.indexOf(delegate);
        if (index > -1) {
            this.delegates.splice(index, 1);
        }
    }
    includes(delegate) {
        return this.delegates.includes(delegate);
    }
    delegate(obj, newValue, oldValue) {
        this.delegates.forEach((delegate) => delegate(newValue, obj, oldValue));
    }
}
export default function initState(initial = {}) {
    let delegates = Object.freeze({});
    const state = new Proxy({}, {
        get(obj, prop) {
            return prop === delegatesReference ? delegates : Object.freeze(obj[prop]);
        },
        set(obj, prop, value) {
            const oldValue = obj[prop];
            obj[prop] = value;
            obj = Object.freeze(Object.assign({}, obj));
            if (!delegates[prop]) {
                delegates = Object.freeze(Object.assign({}, delegates, { [prop]: new DelegateCollection() }));
            }
            else {
                delegates[prop].delegate(obj, value, oldValue);
            }
            return true;
        },
        deleteProperty(obj, prop) {
            if (prop === delegatesReference) {
                return false;
            }
            delete obj[prop];
            return true;
        },
    });
    for (let k in initial) {
        const value = initial[k];
        if (Array.isArray(value)) {
            state[k] = Array.from(value);
        }
        else if (typeof value === 'object') {
            state[k] = Object.assign({}, value);
        }
        else {
            state[k] = value;
        }
    }
    return state;
}
//# sourceMappingURL=state.js.map