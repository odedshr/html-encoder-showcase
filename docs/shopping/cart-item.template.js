export function getNode(data = {}) {
    return new JSNode(data);
}
export function initNode(existingNode) {
    return new JSNode({}, existingNode);
}
export default class JSNode {
    constructor(data, existingNode) {
        this.set = {};
        this.funcs = {}; /*here?*/
        this.domParser = new window.DOMParser();
        this.docElm = this.getDocElm();
        this.data = data;
        if (existingNode) {
            this.node = this.initExitingElement(existingNode);
        }
        else {
            this.node = this.fillNode();
        }
        const self = this;
        const originalToString = this.node.toString;
        this.node.toString = () => self.fixHTMLTags(originalToString.call(this.node));
        return this.node;
    }
    initExitingElement(node) {
        const self = this;
        if (node.nodeType === 9) {
            Array.from(node.childNodes)
                .filter((child) => !!child.setAttribute)
                .forEach((child) => initChild(self, child));
        }
        else {
            initChild(self, node);
        }
        return node;
    }
    fillNode() {
        const self = this;
        //docElm is used by injected code
        const docElm = this.docElm;
        // main code goes here:
        //@ts-ignore returned value might be DocumentFragment which isn't a childNode, which might cause tsc to complain
        this.node = (function () {
            const elm = docElm.createElement('tr');
            elm.setAttribute('class', 'cartItem');
            elm.appendChild(docElm.createTextNode(`
  `));
            elm.appendChild((function () {
                const elm = docElm.createElement('td');
                elm.appendChild(docElm.createTextNode(`
    `));
                elm.appendChild((function () {
                    const elm = docElm.createElement('img');
                    elm.setAttribute('class', 'cartItem_image');
                    return elm;
                })());
                elm.appendChild(docElm.createTextNode(`
    `));
                {
                    let node = self._getPrecedingOrSelf(elm), tmpAttrs;
                    node.setAttribute('src', self._getValue(self.data, 'item.image'));
                }
                elm.appendChild(docElm.createTextNode(`
  `));
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
  `));
            elm.appendChild((function () {
                const elm = docElm.createElement('td');
                elm.setAttribute('class', 'cartItem_name');
                elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.name')); return node; })());
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
  `));
            elm.appendChild((function () {
                const elm = docElm.createElement('td');
                elm.setAttribute('class', 'cartItem_cost');
                elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.cost')); return node; })());
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
    `));
            elm.appendChild((function () {
                const elm = docElm.createElement('div');
                elm.setAttribute('class', 'cartItem_qty');
                elm.appendChild(docElm.createTextNode(`
    `));
                elm.appendChild((function () {
                    const elm = docElm.createElement('input');
                    elm.setAttribute('class', 'cartItem_qty_field');
                    elm.setAttribute('type', 'number');
                    return elm;
                })());
                elm.appendChild(docElm.createTextNode(`
    `));
                {
                    let node = self._getPrecedingOrSelf(elm), tmpAttrs;
                    node.setAttribute('value', self._getValue(self.data, 'item.qty'));
                }
                elm.appendChild(docElm.createTextNode(`

    `));
                elm.appendChild((function () {
                    const elm = docElm.createElement('label');
                    elm.setAttribute('class', 'cartItem_remove_btn');
                    elm.appendChild(docElm.createTextNode(`
      `));
                    {
                        let node = self._getPrecedingOrSelf(elm), tmpAttrs;
                        node.setAttribute('for', self._getValue(self.data, 'item.isInCartId'));
                    }
                    elm.appendChild(docElm.createTextNode(`
      `));
                    elm.appendChild((function () {
                        const elm = docElm.createElement('span');
                        elm.appendChild(docElm.createTextNode(`remove`));
                        return elm;
                    })());
                    elm.appendChild(docElm.createTextNode(`
    `));
                    return elm;
                })());
                elm.appendChild(docElm.createTextNode(`
  `));
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
  `));
            elm.appendChild((function () {
                const elm = docElm.createElement('td');
                elm.setAttribute('class', 'cartItem_totalCost');
                elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'item.totalCost')); return node; })());
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
`));
            return elm;
        })();
        // end of main code
        return this.node;
    }
    getDocElm() {
        return typeof document !== 'undefined' ? document : this.domParser.parseFromString('<html></html>', 'text/xml');
    }
    register(key, value) {
        if (!this.set[key]) {
            this.set[key] = [];
        }
        this.set[key].push(value);
    }
    _getPrecedingOrSelf(elm) {
        //@ts-ignore
        const children = Array.from(elm.childNodes);
        children.reverse();
        return (children.find(function (child) {
            return child.nodeType === 1;
        }) || elm);
    }
    _getValue(data, path) {
        if (path.match(/^(['"].*(\1))$/)) {
            return path.substring(1, path.length - 1);
        }
        return path[0] === '!'
            ? !this._getValue(data, path.substr(1))
            : path.split('.').reduce(function (ptr, step) {
                return ptr && ptr.hasOwnProperty(step) ? ptr[step] : undefined;
            }, data);
    }
    fixHTMLTags(xmlString) {
        return xmlString.replace(/\<(?!area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([a-z|A-Z|_|\-|:|0-9]+)([^>]*)\/\>/gm, '<$1$2></$1>');
    }
}
// functions goes here
function getAddedChildren(parent, fn) {
    const items = [];
    const beforeChildCount = parent.childNodes.length;
    fn();
    const afterChildCount = parent.childNodes.length;
    for (let i = beforeChildCount; i < afterChildCount; i++) {
        items.push(parent.childNodes.item(i));
    }
    return [items];
}
function initChild(self, node) {
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
                self.register(varName, { type: 'text', node: node.childNodes[+childIndex] });
            });
        const dataLiveHtml = node.getAttribute('data-live-html');
        dataLiveHtml &&
            dataLiveHtml.split(';').forEach((attr) => {
                const [childIndex, varName] = attr.split('|');
                self.register(varName, { type: 'html', node: node.childNodes[+childIndex] });
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
        .filter((child) => !!child.hasAttribute && !child.hasAttribute('data-live-root'))
        .forEach((child) => initChild(self, child));
}
function getSubroutineChildren(node, attribute) {
    const output = {};
    Array.from(node.childNodes).forEach((child) => {
        if (child.hasAttribute(attribute)) {
            const [key, collection] = (child.getAttribute(attribute) || '').split('|');
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
//# sourceMappingURL=cart-item.template.js.map