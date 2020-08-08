var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getNode } from './gallery.template.js';
import initState from '../common/state.js';
import { get } from './dataProvider.js';
const state = initState({
    cart: [],
    items: [],
    count: 0,
    cartCount: getCartCountString(0),
    cartCost: 0,
    cartEmpty: true
});
const app = getNode(state);
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield get();
        const products = data.items.map((product, i) => (Object.assign(Object.assign({}, product), { qty: 0, totalCost: 0 })));
        state.items = products;
        state.count = data.count;
    });
}
export function initApp() {
    var _a, _b, _c, _d, _e, _f;
    getData();
    const form = app.set.productsForm;
    form.onsubmit = () => false;
    form.addEventListener('submit', evt => {
        const source = evt.submitter;
        if (source) {
            const task = source.getAttribute('data-tasK');
            const id = source.getAttribute('data-id');
            if (!task) {
                return;
            }
            if (!id) {
                switch (task) {
                    case 'checkout':
                        alert('Not implemented');
                        return;
                    case 'removeAll':
                        removeAllListeners();
                        return;
                    default: console.log('unknown command:', task);
                }
            }
            else {
                switch (task) {
                    case 'add':
                        updateQuantity(id, 1);
                        return;
                    case 'remove':
                        setQuantity(id, 0);
                        return;
                    case 'inc':
                        updateQuantity(id, 1);
                        return;
                    case 'dec':
                        updateQuantity(id, -1);
                        return;
                    default: console.log('unknown command:', task);
                }
            }
        }
    });
    form.addEventListener('change', evt => {
        const source = evt.target;
        const sourceId = source.id;
        console.log(sourceId);
    });
    (_a = state.$) === null || _a === void 0 ? void 0 : _a.items.add(items => { app.set.items = items; });
    (_b = state.$) === null || _b === void 0 ? void 0 : _b.cart.add(items => { app.set.cart = items; });
    (_c = state.$) === null || _c === void 0 ? void 0 : _c.count.add(count => { app.set.count = count; });
    (_d = state.$) === null || _d === void 0 ? void 0 : _d.cartCount.add(cartCount => { app.set.cartCount = getCartCountString(cartCount); });
    (_e = state.$) === null || _e === void 0 ? void 0 : _e.cartCost.add(cartCost => { app.set.cartCost = cartCost; });
    (_f = state.$) === null || _f === void 0 ? void 0 : _f.cartEmpty.add(isEmpty => {
        const showCart = app.set.showCart;
        showCart.disabled = isEmpty;
        if (isEmpty) {
            showCart.checked = false;
            showCart.setAttribute('disabled', 'disabled');
        }
    });
    return app;
}
function updateProduct(id, action) {
    const copy = state.items.slice(0);
    const productIndex = copy.findIndex((product) => product.id === id);
    const product = copy[productIndex];
    copy[productIndex] = action(product);
    state.items = copy;
    setCart(state, copy.filter((product) => !!product.qty));
}
function setCart(state, cartContent) {
    state.cartCount = cartContent.reduce((memo, product) => (memo + product.qty), 0);
    state.cartCost = cartContent.reduce((memo, product) => (memo + (product.cost * product.qty)), 0);
    state.cartEmpty = !state.cartCount;
    state.cart = cartContent;
}
function updateQuantity(id, updateCount) {
    updateProduct(id, product => {
        const qty = product.qty + updateCount;
        const totalCost = qty * product.cost;
        return Object.assign(Object.assign({}, product), { qty: product.qty + updateCount, totalCost });
    });
}
function setQuantity(id, newValue) {
    updateProduct(id, product => (Object.assign(Object.assign({}, product), { qty: newValue, totalCost: newValue * product.cost })));
}
function getCartCountString(count) {
    return count ? (`${count} ${count !== 1 ? 'items' : 'item'}`) : '';
}
function removeAllListeners() {
    const copy = state.items.slice(0);
    state.items = copy.map(item => (Object.assign(Object.assign({}, item), { qty: 0, totalCost: 0 })));
    setCart(state, []);
}
// function refresh(tasks: Task[], show: 'all' | 'active' | 'completed') {
//   const filteredTasks = prepTasks(tasks, show);
//   app.set.tasks = filteredTasks as any;
//   app.set.count = getCountString(filteredTasks.length) as any;
// }
//# sourceMappingURL=index.js.map