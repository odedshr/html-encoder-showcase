declare type KeyedObject = { [key: string]: any };
declare type Property = {
  type: 'text' | 'html' | 'attribute' | 'loop' | 'conditional';
  node: Node;
  attrName?: string;
  details?: subRoutineInstructions;
};
declare type subRoutineInstructions = {
  startAt: number;
  fn: (value: any) => ChildNode[][];
  fnName: string;
  items?: any;
  flag?: boolean;
  nodes?: ChildNode[][];
};

interface NodeWithSet extends Node {
  set: { [key: string]: Property[] }
}

export function getNode(data: { [key: string]: any } = {}): NodeWithSet {
  return <NodeWithSet><unknown>new JSNode(data);
}

export function initNode(existingNode: ChildNode): Node {
  return <NodeWithSet><unknown>new JSNode({}, existingNode);
}

export default class JSNode {
  set: { [key: string]: Property[] } = {};
  data: { [key: string]: any };
  node: ChildNode;
  domParser: DOMParser;
  docElm: Document;
  funcs: { [key: string]: Function } = {loopItemCartcart_1 (self:JSNode, docElm:Document, elm:Node, items:any) {
          const fn = function() {
            elm.appendChild(docElm.createTextNode(`
          `));
elm.appendChild((function () { const elm = docElm.createElement('tr');
elm.setAttribute('class','cartItem');
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cartItem_imageTd');
elm.appendChild(docElm.createTextNode(`
              `));
elm.appendChild((function () { const elm = docElm.createElement('img');
elm.setAttribute('class','cartItem_image');
 return elm; })());
elm.appendChild(docElm.createTextNode(`
              `));
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('src', self._getValue(self.data, 'item.image'));
}
elm.appendChild(docElm.createTextNode(`
            `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cartItem_name');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.name'));  return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cartItem_cost');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.cost'));  return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cartItem_qty');
elm.appendChild(docElm.createTextNode(`
              `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('data-task','dec');
elm.setAttribute('class','cartItem_qty_dec');
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('data-id', self._getValue(self.data, 'item.id'));
}
elm.appendChild(docElm.createTextNode(`-`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
              `));
elm.appendChild((function () { const elm = docElm.createElement('input');
elm.setAttribute('class','cartItem_qty_field');
elm.setAttribute('type','number');
 return elm; })());
elm.appendChild(docElm.createTextNode(`
              `));
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('value', self._getValue(self.data, 'item.qty'));
}
elm.appendChild(docElm.createTextNode(`
              `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('data-task','inc');
elm.setAttribute('class','cartItem_qty_inc');
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('data-id', self._getValue(self.data, 'item.id'));
}
elm.appendChild(docElm.createTextNode(`+`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`

              `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('class','cartItem_remove_btn');
elm.setAttribute('data-task','remove');
elm.appendChild(docElm.createTextNode(`
                `));
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('data-id', self._getValue(self.data, 'item.id'));
}
elm.appendChild(docElm.createTextNode(`
                `));
elm.appendChild((function () { const elm = docElm.createElement('span');
elm.appendChild(docElm.createTextNode(`remove`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
              `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cartItem_totalCost');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.totalCost'));  return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
          `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
          `));
          };

          return self._forEach('item', '$i', elm, fn, items);
        },
ifItemInStock_3 (self:JSNode, docElm:Document, elm:Node) {
          const fn = function () { elm.appendChild(docElm.createTextNode(`
          `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('data-task','add');
elm.setAttribute('class','product_action product_addBasket');
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('data-id', self._getValue(self.data, 'item.id'));
}
elm.appendChild((function () { const elm = docElm.createElement('span');
elm.appendChild(docElm.createTextNode(`Add to basket`));
 return elm; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `)); };
	        return getAddedChildren(elm, fn);
        },
loopItemItemsitems_2 (self:JSNode, docElm:Document, elm:Node, items:any) {
          const fn = function() {
            elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('li');
elm.setAttribute('class','product');
elm.appendChild(docElm.createTextNode(`
      `));
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('data-name', self._getValue(self.data, 'item.name'));
}
elm.appendChild(docElm.createTextNode(`
      `));
{ let tmpElm = self._getPrecedingOrSelf(elm), tmpCss = tmpElm.getAttribute('class') || '',
		target = tmpCss.length ? tmpCss.split(/s/) : [];
if (self._getValue(self.data, '!item.inStock')) {
tmpCss = self._getValue(self.data, '"product_outOfStock"');
				(Array.isArray(tmpCss) ? tmpCss : [tmpCss]).forEach(function (css) { target.push(css); });
			
}
tmpElm.setAttribute('class', target.join(' ')); }
elm.appendChild(docElm.createTextNode(`

      `));
elm.appendChild((function () { const elm = docElm.createElement('img');
elm.setAttribute('class','product_image');
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
{ let node = self._getPrecedingOrSelf(elm), tmpAttrs;
node.setAttribute('src', self._getValue(self.data, 'item.image'));
}
elm.appendChild(docElm.createTextNode(`
      `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','product_actions');
elm.appendChild(docElm.createTextNode(`
        `));
 {
          const startAt = elm.childNodes.length;
					const fn = self.funcs.ifItemInStock_3.bind({},self, docElm, elm);
					const flag = !!self._getValue(self.data, 'item.inStock');
					const nodes = flag ? fn() : [];

					
				}
elm.appendChild(docElm.createTextNode(`
        `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`

      `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','product_summary');
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','product_name');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.name'));  return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','product_cost');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.cost'));  return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
    `));
 return elm; })());
          };

          return self._forEach('item', '$i', elm, fn, items);
        }};/*here?*/

  constructor(data: object, existingNode?: ChildNode) {
    this.domParser = new window.DOMParser();

    this.docElm = this.getDocElm();

    this.data = data;

    if (existingNode) {
      this.node = this.initExitingElement(existingNode);
    } else {
      this.node = this.fillNode();
    }

    const self = this;
    const originalToString = this.node.toString;
    this.node.toString = () => self.fixHTMLTags(originalToString.call(this.node));
    return <any>this.node;
  }

  private initExitingElement(node: ChildNode) {
    const self = this;
    if (node.nodeType === 9) {
      Array.from(node.childNodes)
        .filter((child: ChildNode) => !!(<HTMLElement>child).setAttribute)
        .forEach((child: ChildNode) => initChild(self, <HTMLElement>child));
    } else {
      initChild(self, <Element>node);
    }
    addReactiveFunctionality(<Element>node, this.set, this.domParser);

    return node;
  }

  private fillNode(): ChildNode {
    const self = this;

    //docElm is used by injected code
    const docElm = this.docElm;
    // main code goes here:
    //@ts-ignore returned value might be DocumentFragment which isn't a childNode, which might cause tsc to complain
    this.node = (function () { const elm = docElm.createElement('form');
self.register('productsForm', { node: elm, type: 'html' });
elm.setAttribute('id','productsForm');
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('section');
elm.setAttribute('class','gallery_header');
elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','gallery_title');
elm.appendChild(docElm.createTextNode(`Casa `));
elm.appendChild((function () { const elm = docElm.createElement('sub');
elm.appendChild(docElm.createTextNode(`de`));
 return elm; })());
elm.appendChild(docElm.createTextNode(` Olaf`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cart');
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('label');
elm.setAttribute('for','showCart');
elm.setAttribute('class','cartSummary');
elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cartSummary_count');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'cartCount')); self.register('cartCount',{ node, type: 'text' }); return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('span');
elm.setAttribute('class','cartSummary_action');
elm.appendChild(docElm.createTextNode(`View my bag`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('input');
elm.setAttribute('type','checkbox');
self.register('showCart', { node: elm, type: 'html' });
elm.setAttribute('id','showCart');
elm.setAttribute('hidden','hidden');
elm.setAttribute('disabled','disabled');
elm.setAttribute('class','showCart_checkbox');
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cartWrapper');
elm.appendChild(docElm.createTextNode(`
    `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cartContent');
elm.appendChild(docElm.createTextNode(`
      `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cart_header');
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('h2');
elm.setAttribute('class','cart_title');
elm.appendChild(docElm.createTextNode(`Review your basket`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('label');
elm.setAttribute('for','showCart');
elm.setAttribute('class','cart_close');
elm.appendChild((function () { const elm = docElm.createElement('span');
elm.appendChild(docElm.createTextNode(`close`));
 return elm; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
elm.appendChild((function () { const elm = docElm.createElement('table');
elm.setAttribute('class','cart_table');
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('thead');
elm.appendChild(docElm.createTextNode(`
          `));
elm.appendChild((function () { const elm = docElm.createElement('tr');
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('th');
elm.appendChild(docElm.createTextNode(` `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('th');
elm.appendChild(docElm.createTextNode(`Item`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('th');
elm.appendChild(docElm.createTextNode(`Price`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('th');
elm.appendChild(docElm.createTextNode(`Qty.`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('th');
elm.appendChild(docElm.createTextNode(`Total`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
          `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('tbody');
elm.appendChild(docElm.createTextNode(`
          `));
{ 
          const fn = self.funcs.loopItemCartcart_1.bind({},self, docElm, elm);
					const startAt = elm.childNodes.length;
          const items = clone(self._getValue(self.data, 'cart')) || [];
					const nodes = fn(items);
					self.register('cart', { type: 'loop', node: elm, details: { startAt, fn, fnName: 'loopItemCartcart_1', items, nodes } });

				}
elm.appendChild(docElm.createTextNode(`
        `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('tfoot');
elm.appendChild(docElm.createTextNode(`
          `));
elm.appendChild((function () { const elm = docElm.createElement('tr');
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('colspan','4');
elm.appendChild(docElm.createTextNode(` `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
            `));
elm.appendChild((function () { const elm = docElm.createElement('td');
elm.setAttribute('class','cart_total');
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'cartCost')); self.register('cartCost',{ node, type: 'text' }); return node; })());
 return elm; })());
elm.appendChild(docElm.createTextNode(`
          `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','cart_actions');
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('class','cart_removeAll');
elm.setAttribute('data-task','removeAll');
elm.appendChild(docElm.createTextNode(`Remove all items`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
        `));
elm.appendChild((function () { const elm = docElm.createElement('button');
elm.setAttribute('class','cart_checkout');
elm.setAttribute('data-task','checkout');
elm.appendChild(docElm.createTextNode(`Checkout`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
      `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
    `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','breadcrumbs');
elm.appendChild(docElm.createTextNode(`home > delivery > cakes`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','section_title');
elm.appendChild(docElm.createTextNode(`All Cakes`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
  `));
elm.appendChild((function () { const elm = docElm.createElement('div');
elm.setAttribute('class','item_count');
elm.appendChild(docElm.createTextNode(`(`));
elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'count')); self.register('count',{ node, type: 'text' }); return node; })());
elm.appendChild(docElm.createTextNode(` items)`));
 return elm; })());
elm.appendChild(docElm.createTextNode(`

  `));
elm.appendChild((function () { const elm = docElm.createElement('ul');
elm.setAttribute('class','gallery_items');
elm.appendChild(docElm.createTextNode(`
  `));
{ 
          const fn = self.funcs.loopItemItemsitems_2.bind({},self, docElm, elm);
					const startAt = elm.childNodes.length;
          const items = clone(self._getValue(self.data, 'items')) || [];
					const nodes = fn(items);
					self.register('items', { type: 'loop', node: elm, details: { startAt, fn, fnName: 'loopItemItemsitems_2', items, nodes } });

				}
elm.appendChild(docElm.createTextNode(`
  `));
 return elm; })());
elm.appendChild(docElm.createTextNode(`
`));
 return elm; })();self._defineSet(false);;
    // end of main code
    return this.node;
  }

  private getDocElm(): Document {
    return typeof document !== 'undefined' ? document : this.domParser.parseFromString('<html></html>', 'text/xml');
  }
  public register(key: string, value: Property) {
    if (!this.set[key]) {
      this.set[key] = [];
    }
    this.set[key].push(value);
  }
  protected _defineSet(isSSR: boolean) {
    if (Object.keys(this.set).length) {
      if (isSSR) {
        // if node is Document refer to the first child (the <html>);
        (this.node.nodeType === 9 ? this.findHTMLChildren(this.node) : [this.node]).forEach((node: ChildNode) =>
          (<HTMLElement>node).setAttribute('data-live-root', '')
        );
        addServerReactiveFunctionality(this.set);
      } else {
        addReactiveFunctionality(this.node, this.set, this.domParser);
      }
    }
  }

  private findHTMLChildren(root: ChildNode): HTMLElement[] {
    return <HTMLElement[]>Array.from(root.childNodes).filter((child) => !!(<HTMLElement>child).setAttribute);
  }
  _forEach(iteratorName: string, indexName: string, parent: Node, fn: Function, list: any): ChildNode[][] {
    const self = this;
    const orig = {
      iterator: self._getValue(this.data, iteratorName),
      index: self._getValue(this.data, indexName),
    };
    const items: ChildNode[][] = [];

    for (let id in list) {
      self._setValue(this.data, indexName, id);
      self._setValue(this.data, iteratorName, list[id]);
      getAddedChildren(parent, fn).forEach(item => items.push(item));
    }
    self._setValue(this.data, iteratorName, orig.iterator);
    self._setValue(this.data, indexName, orig.index);
    return items;
  }
  _getPrecedingOrSelf(elm: HTMLElement): HTMLElement {
    //@ts-ignore
    const children = Array.from(elm.childNodes);
    children.reverse();

    return (children.find(function (child) {
      return child.nodeType === 1;
    }) || elm) as HTMLElement;
  }
  _getValue(data: KeyedObject, path: string): any {
    if (path.match(/^(['"].*(\1))$/)) {
      return path.substring(1, path.length - 1);
    }

    return path[0] === '!'
      ? !this._getValue(data, path.substr(1))
      : path.split('.').reduce(function (ptr: KeyedObject, step: string) {
        return ptr && ptr.hasOwnProperty(step) ? ptr[step] : undefined;
      }, data);
  }
  _setValue(data: KeyedObject, path: string, value: any) {
    const pathParts = path.split('.');
    const varName = pathParts.pop();
    if (varName) {
      pathParts.reduce(function (ptr: { [key: string]: any }, step) {
        return ptr && ptr.hasOwnProperty(step) ? ptr[step] : undefined;
      }, data)[varName] = value;
    }
  }
  private fixHTMLTags(xmlString: string) {
    return xmlString.replace(
      /\<(?!area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([a-z|A-Z|_|\-|:|0-9]+)([^>]*)\/\>/gm,
      '<$1$2></$1>'
    );
  }
}

// functions goes here

function getAddedChildren(parent: Node, fn: Function): ChildNode[][] {
  const items = [];
  const beforeChildCount = parent.childNodes.length;
  fn();
  const afterChildCount = parent.childNodes.length;

  for (let i = beforeChildCount; i < afterChildCount; i++) {
    items.push(parent.childNodes.item(i));
  }

  return [items];
}
function clone(item: any) {
  return typeof item === 'object' ? Object.freeze(Array.isArray(item) ? [...item] : { ...item }) : item;
}


function initChild(self: JSNode, node: Element) {
  if (!!node.hasAttribute) {
    const nodeId = node.getAttribute('id');
    nodeId && self.register(nodeId, { type: 'html', node });

    const dataLiveText = node.getAttribute('data-live-text');
    dataLiveText &&
      dataLiveText.split(';').forEach((attr) => {
        const [childIndex, varName] = attr.split('|');
        while (node.childNodes.length <= +childIndex) {
          node.appendChild(document.createTextNode(''));
        }
        self.register(varName, { type: 'text', node: <Element>node.childNodes[+childIndex] });
      });

    const dataLiveHtml = node.getAttribute('data-live-html');
    dataLiveHtml &&
      dataLiveHtml.split(';').forEach((attr) => {
        const [childIndex, varName] = attr.split('|');
        self.register(varName, { type: 'html', node: <Element>node.childNodes[+childIndex] });
      });

    const dataLiveMap = node.getAttribute('data-live-map');
    dataLiveMap && self.register(dataLiveMap, { type: 'attribute', node });

    const dataLiveAttr = node.getAttribute('data-live-attr');
    dataLiveAttr &&
      dataLiveAttr.split(';').forEach((attr) => {
        const [attrName, varName] = attr.split('|');
        self.register(varName, { type: 'attribute', node, attrName });
      });

    if (node.hasAttribute('data-live-loop')) {
      const nodes = getSubroutineChildren(node, 'data-live-loop-child');
      const dataLiveLoop = node.getAttribute('data-live-loop');
      dataLiveLoop &&
        dataLiveLoop.split(';').forEach((attr) => {
          const [startAt, varName, fnName, stringValue] = attr.split('|');
          const fn = self.funcs[fnName].bind({}, self, self.docElm, node);

          self.register(varName, {
            type: 'loop',
            node,
            details: { startAt: +startAt, items: JSON.parse(stringValue), nodes: nodes[varName], fn, fnName },
          });
        });
    }

    const dataLiveIf = node.getAttribute('data-live-if');
    if (dataLiveIf) {
      const nodes = getSubroutineChildren(node, 'data-live-if-child');

      dataLiveIf.split(';').forEach((attr) => {
        const [startAt, varName, fnName, flag] = attr.split('|');
        const fn = self.funcs[fnName].bind({}, self, self.docElm, node);
        self.register(varName, {
          type: 'conditional',
          node,
          details: { startAt: +startAt, flag: flag === 'true', nodes: nodes[varName], fn, fnName },
        });
      });
    }
  }

  Array.from(node.childNodes)
    .filter(
      (child: ChildNode) => !!(<HTMLElement>child).hasAttribute && !(<HTMLElement>child).hasAttribute('data-live-root')
    )
    .forEach((child: ChildNode) => initChild(self, <HTMLElement>child));
}
function addServerReactiveFunctionality(set: { [key: string]: Property[] } = {}) {
  for (let key in set) {
    set[key].forEach((property: Property) => {
      const node = <HTMLElement>property.node;
      const parentNode: HTMLElement = <HTMLElement>node.parentNode;
      switch (property.type) {
        case 'text':
          appendAttribute(parentNode, 'data-live-text', `${indexOfChild(parentNode.childNodes, node)}|${key}`);
          break;
        case 'html':
          if (!node.getAttribute || !(node.getAttribute('id') === key)) {
            const parentNode: HTMLElement = <HTMLElement>node.parentNode;
            appendAttribute(parentNode, 'data-live-html', `${indexOfChild(parentNode.childNodes, node)}|${key}`);
          }
          break;
        case 'attribute':
          if (property.attrName) {
            appendAttribute(node, 'data-live-attr', `${property.attrName}|${key}`);
          } else {
            node.setAttribute('data-live-map', key);
          }
          break;
        case 'loop':
          if (property.details) {
            const { startAt, items, nodes = [], fnName } = property.details;

            appendAttribute(
              node,
              'data-live-loop',
              `${startAt}|${key}|${fnName}|${JSON.stringify(items)}`
            );
            nodes.forEach((collection, i) =>
              collection.forEach((item) => appendAttribute(<HTMLElement>item, 'data-live-loop-child', `${key}|${i}`))
            );
          }
          break;
        case 'conditional':
          if (property.details) {
            const { fn = () => { }, startAt, flag, nodes = [], fnName } = property.details;
            appendAttribute(node, 'data-live-if', `${startAt}|${key}|${fnName}|${flag}`);
            nodes.forEach((collection, i) =>
              collection.forEach((item) => (item.nodeType === 1) && appendAttribute(<HTMLElement>item, 'data-live-if-child', `${key}|${i}`))
            );
          }
          break;
      }
    });
  }
}

function indexOfChild(childNodes: NodeListOf<ChildNode>, child: ChildNode) {
  return Array.prototype.indexOf.call(childNodes, child);
}

function appendAttribute(node: HTMLElement, attributeName: string, newChild: string) {
  const value = [newChild];
  const attribute = node.getAttribute(attributeName);
  attribute !== null && value.unshift(attribute);
  node.setAttribute(attributeName, value.filter((v) => v.length).join(';'));
}

function addReactiveFunctionality(node: ChildNode, set: { [key: string]: Property[] } = {}, domParser: DOMParser) {
  Object.defineProperty(node, 'set', {
    value: getSetProxy(set, domParser),
    configurable: true,
    writable: true,
  });
}

function getSetProxy(map: { [key: string]: Property[] }, domParser: DOMParser) {
  return new Proxy(map, {
    get: function (map, prop: string) {
      if (map[prop] === undefined) {
        return undefined;
      }
      // we may have multiple connectors to this prop, we'll only fetch the value from the first one:
      const property = map[prop][0];
      if (property) {
        switch (property.type) {
          case 'text':
            return property.node.textContent;
          case 'html':
            return property.node;
          case 'attribute':
            return property.attrName && (<Element>property.node).getAttribute(property.attrName);
          case 'loop':
            return property?.details?.items;
          case 'conditional':
            return property?.details?.flag;
        }
      }
    },
    set: function (map: KeyedObject, prop: string, value: any) {
      if (map[prop] === undefined) {
        throw new Error(`property '${prop}' not found`);
      }
      map[prop].forEach((property: Property) => {
        switch (property.type) {
          case 'text':
            (<any>property.node).data = value;
            break;
          case 'html':
            try {
              const newNode = typeof value === 'string' ? domParser.parseFromString(value, 'text/xml') : value;
              if (property.node && property.node.parentNode) {
                property.node.parentNode.replaceChild(newNode, property.node);
              }
              property.node = newNode;
            } catch (err) {
              throw new Error(`failed to replace node to ${value} (${err})`);
            }
            break;
          case 'attribute':
            if (property.attrName) {
              // single attribute
              if (value === null) {
                (property.node as Element).removeAttribute(property.attrName);
              } else {
                (property.node as Element).setAttribute(property.attrName, value);
              }
            } else {
              // attribute map
              Object.keys(value).forEach((attrName) => (property.node as Element).setAttribute(attrName, value[attrName]));
            }
            break;
          case 'loop':
            updateLoop(property, value);
            break;
          case 'conditional':
            updateConditional(property, value);
            break;
        }
      });
      return true;
    },
  });
}

// items are groups of nodes, we want to count the number of nodes insides groups until index
function countElementsUntilIndex(items: ChildNode[][], index: number) {
  const count = Math.min(index, items.length);
  let acc = 0;
  for (let i = 0; i < count; i++) {
    acc += items[i].length;
  }
  return acc;
}

function updateLoop(property: Property, value: any) {
  if (property.details) {
    const parent = property.node;
    const { fn, items, nodes = [], startAt } = property.details;

    const instructions: DiffInstructions = diff(items, value);

    const removedChildren: ChildNode[][] = instructions.removed.map((i) => {
      nodes[i].forEach((node) => parent.removeChild(node));
      return nodes[i];
    });

    fn(instructions.added).forEach((children: any) => nodes.push(children));

    // updatedNodes has added nodes at the end, so we know where they are, but it will cause issues on second iteration
    const updatedNodes = nodes.filter((group: ChildNode[]) => !removedChildren.includes(group));
    // orderedNodes will keep the nodes in the right order
    const orderedNodes: ChildNode[][] = [];

    instructions.positions.forEach((i, newIndex) => {
      orderedNodes.push(updatedNodes[i]);

      if (newIndex !== -1) {
        const newP = countElementsUntilIndex(updatedNodes, newIndex);
        const sibling = parent.childNodes.item(startAt + newP);
        if (updatedNodes[i] && (sibling !== updatedNodes[i][0])) {
          updatedNodes[i].forEach((child) => parent.insertBefore(child, sibling));
        }
      }
    });

    property.details.nodes = orderedNodes;
    property.details.items = clone(value);
  }
}

type DiffInstructions = {
  removed: number[];
  added: any[] | { [key: string]: any };
  positions: number[];
};

function toMap(source: any[] | { [key: string]: any }): Map<string | number, any> {
  const map = new Map();
  if (Array.isArray(source)) {
    return new Map(source.map((v, k) => [k, v]));
  } else {
    return new Map(Object.keys(source).map(k => [k, source[k]]));
  }
}


function findIndex(map: Map<string | number, any>, item: any, placed: Map<string | number, boolean>) {
  let index = 0;
  for (let [key, targetItem] of map) {
    if (targetItem === item && !placed.get(key)) {
      return index;
    }
    index++;
  }
}

function diff(source: any[] | { [key: string]: any }, target: any[] | { [key: string]: any }): DiffInstructions {
  const sourceMap = toMap(source);
  const targetMap = toMap(target);
  const placed: Map<string | number, boolean> = new Map([...targetMap.keys()].map(key => ([key, false])));

  const toPosition: number[] = [];

  const output: DiffInstructions = {
    removed: [],
    added: Array.isArray(target) ? [] : {},
    positions: [],
  };

  // set existing items to either removed or new positions
  let index = 0;
  for (let [, item] of sourceMap) {
    const position = findIndex(targetMap, item, placed);
    if (position === undefined) {
      output.removed.push(index);
    } else {
      toPosition.push(position);
      placed.set(position, true);
    }
    index++;
  }
  output.removed = output.removed.sort().reverse();

  // write new item positions
  index = 0;
  for (let [key, item] of targetMap) {
    if (!placed.get(key)) {
      toPosition.push(index);
      if (Array.isArray(output.added)) {
        output.added.push(item);
      } else {
        output.added[key] = item;
      }
    }
    index++;
  }

  // toPosition is [index]=>target-position, but I want to know who goes to target-position
  // so I transpose the array;
  toPosition.forEach((target, index) => {
    output.positions[target] = index;
  });

  return output;
}

function updateConditional(property: Property, value: boolean) {
  if (property.details) {
    const parent = property.node;
    let updatedNodes: ChildNode[][] = [];
    const { fn = () => [], flag, nodes = [], startAt } = property.details;

    if (flag && !value) {
      while (nodes[0].length) {
        const child = nodes[0].pop();
        child && parent.removeChild(child);
      }
    } else if (!flag && value) {
      updatedNodes = fn(value);

      if (parent.childNodes.length < startAt) {
        property.details.startAt = parent.childNodes.length - updatedNodes[0].length;
      } else {
        const sibling = parent.childNodes.item(startAt);
        updatedNodes[0].forEach((node) => {
          if (indexOfChild(parent.childNodes, node) !== startAt) {
            parent.insertBefore(node, sibling);
          }
        });
      }
    }

    property.details.nodes = updatedNodes;
    property.details.flag = value;
  }
}
function getSubroutineChildren(node: ChildNode, attribute: string): { [key: string]: ChildNode[][] } {
  const output: { [key: string]: ChildNode[][] } = {};
  Array.from(node.childNodes).forEach((child: ChildNode) => {
    if ((<HTMLElement>child).hasAttribute(attribute)) {
      const [key, collection] = ((<HTMLElement>child).getAttribute(attribute) || '').split('|');
      if (!output[key]) {
        output[key] = [];
      }
      if (!output[key][+collection]) {
        output[key][+collection] = [];
      }
      output[key][+collection].push(child);
    }
  });
  return output;
}
