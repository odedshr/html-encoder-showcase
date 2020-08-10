import { getNode } from './gallery.template.js';
import initState, { State } from '../common/state.js';
import { ProductData, Results, get } from './dataProvider.js';


type Product = ProductData & {
  qty: number;
  totalCost: number;
}

const state: State = initState({
  cart: [],
  items: [],
  count: 0,
  cartCount: getCartCountString(0),
  cartCost: 0,
  cartEmpty: true
});

const app = getNode(state);

async function getData() {
  const data: Results = await get();
  const products: Product[] = data.items.map(
    (product: ProductData, i: number) => ({
      ...product,
      qty: 0,
      totalCost: 0
    })
  );
  state.items = products;
  state.count = data.count;
}

export function initApp() {
  getData();
  const form = app.set.productsForm as unknown as HTMLFormElement;
  form.onsubmit = () => false;

  form.addEventListener('submit', evt => {
    const source = ((evt as any).submitter || document.activeElement) as HTMLButtonElement;
    if (source) {
      const task = source.getAttribute('data-tasK');
      const id = source.getAttribute('data-id');

      if (!task) {
        return;
      }

      if (!id) {
        switch (task) {
          case 'checkout': alert('Not implemented'); return;
          case 'removeAll': removeAllListeners(); return;
          default: console.log('unknown command:', task);
        }
      } else {
        switch (task) {
          case 'add': updateQuantity(id, 1); return;
          case 'remove': setQuantity(id, 0); return;
          case 'inc': updateQuantity(id, 1); return;
          case 'dec': updateQuantity(id, -1); return;
          default: console.log('unknown command:', task);
        }
      }
    }
  });
  form.addEventListener('change', evt => {
    const source = evt.target as HTMLInputElement;
    const sourceId = source.id;

    console.log(sourceId);
  });

  state.$?.items.add(items => { app.set.items = items; });
  state.$?.cart.add(items => { app.set.cart = items; });
  state.$?.count.add(count => { app.set.count = count; });
  state.$?.cartCount.add(cartCount => { app.set.cartCount = getCartCountString(cartCount); });
  state.$?.cartCost.add(cartCost => { app.set.cartCost = cartCost; });
  state.$?.cartEmpty.add(isEmpty => {
    const showCart = (app.set.showCart as unknown as HTMLInputElement);
    showCart.disabled = isEmpty
    if (isEmpty) {
      showCart.checked = false;
      showCart.setAttribute('disabled', 'disabled');
    }
  });


  if (isSafari()) {
    window.setTimeout(() =>
      form.querySelectorAll<HTMLButtonElement>('.product_action').forEach(
        (btn: HTMLButtonElement) => btn.addEventListener('click',
          (evt: Event) => (evt?.target as HTMLButtonElement).focus()
        )
      ),
      0);
  }
  return app as Node;
}

function isSafari() {
  return navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
}

function updateProduct(id: string, action: (product: Product) => Product) {
  const copy = state.items.slice(0);
  const productIndex: number = copy.findIndex((product: Product) => product.id === id);
  const product: Product = copy[productIndex];
  copy[productIndex] = action(product);
  state.items = copy;
  setCart(state, copy.filter((product: Product) => !!product.qty));
}

function setCart(state: State, cartContent: Product[]) {
  state.cartCount = cartContent.reduce((memo, product) => (memo + product.qty), 0);
  state.cartCost = cartContent.reduce((memo, product) => (memo + (product.cost * product.qty)), 0);
  state.cartEmpty = !state.cartCount;
  state.cart = cartContent;
}

function updateQuantity(id: string, updateCount: number) {
  updateProduct(id, product => {
    const qty = product.qty + updateCount;
    const totalCost = qty * product.cost;
    return { ...product, qty: product.qty + updateCount, totalCost };
  });
}

function setQuantity(id: string, newValue: number) {
  updateProduct(id, product => ({ ...product, qty: newValue, totalCost: newValue * product.cost }));
}

function getCartCountString(count: number): any {
  return count ? (`${count} ${count !== 1 ? 'items' : 'item'}`) : '';
}

function removeAllListeners() {
  const copy: Product[] = state.items.slice(0);
  state.items = copy.map(item => ({
    ...item,
    qty: 0,
    totalCost: 0
  }));
  setCart(state, []);
}

// function refresh(tasks: Task[], show: 'all' | 'active' | 'completed') {
//   const filteredTasks = prepTasks(tasks, show);
//   app.set.tasks = filteredTasks as any;
//   app.set.count = getCountString(filteredTasks.length) as any;
// }