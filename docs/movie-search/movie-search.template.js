export function getNode(data = {}) {
    return new JSNode(data);
}
export function initNode(existingNode) {
    return new JSNode({}, existingNode);
}
export default class JSNode {
    constructor(data, existingNode) {
        this.set = {};
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
        addReactiveFunctionality(node, this.set, this.domParser);
        return node;
    }
    fillNode() {
        const self = this;
        //docElm is used by injected code
        const docElm = this.docElm;
        // main code goes here:
        //@ts-ignore returned value might be DocumentFragment which isn't a childNode, which might cause tsc to complain
        this.node = (function () {
            const elm = docElm.createDocumentFragment();
            elm.appendChild((function () {
                const elm = docElm.createElement('form');
                self.register('searchForm', { node: elm, type: 'html' });
                elm.setAttribute('id', 'searchForm');
                elm.appendChild(docElm.createTextNode(`
  `));
                elm.appendChild((function () {
                    const elm = docElm.createElement('input');
                    self.register('searchField', { node: elm, type: 'html' });
                    elm.setAttribute('id', 'searchField');
                    return elm;
                })());
                elm.appendChild(docElm.createTextNode(`
  `));
                elm.appendChild((function () {
                    const elm = docElm.createElement('button');
                    elm.appendChild(docElm.createTextNode(`Search`));
                    return elm;
                })());
                elm.appendChild(docElm.createTextNode(`
`));
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`

`));
            elm.appendChild((function () {
                const elm = docElm.createElement('ul');
                elm.setAttribute('class', 'movies');
                {
                    const fn = loopMovieMoviesMovies.bind({}, self, docElm, elm);
                    const startAt = elm.childNodes.length;
                    const items = clone(self._getValue(self.data, 'movies')) || [];
                    const nodes = fn(items);
                    self.register('movies', { type: 'loop', node: elm, details: { startAt, fn, fnName: 'loopMovieMoviesMovies', items, nodes } });
                }
                return elm;
            })());
            return elm;
        })();
        self._defineSet(false);
        ;
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
    _defineSet(isSSR) {
        if (Object.keys(this.set).length) {
            if (isSSR) {
                // if node is Document refer to the first child (the <html>);
                (this.node.nodeType === 9 ? this.findHTMLChildren(this.node) : [this.node]).forEach((node) => node.setAttribute('data-live-root', ''));
                addServerReactiveFunctionality(this.set);
            }
            else {
                addReactiveFunctionality(this.node, this.set, this.domParser);
            }
        }
    }
    findHTMLChildren(root) {
        return Array.from(root.childNodes).filter((child) => !!child.setAttribute);
    }
    _forEach(iteratorName, indexName, parent, fn, list) {
        const self = this;
        const orig = {
            iterator: self._getValue(this.data, iteratorName),
            index: self._getValue(this.data, indexName),
        };
        const items = [];
        for (let id in list) {
            self._setValue(this.data, indexName, id);
            self._setValue(this.data, iteratorName, list[id]);
            getAddedChildren(parent, fn).forEach(item => items.push(item));
        }
        self._setValue(this.data, iteratorName, orig.iterator);
        self._setValue(this.data, indexName, orig.index);
        return items;
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
    _setValue(data, path, value) {
        const pathParts = path.split('.');
        const varName = pathParts.pop();
        if (varName) {
            pathParts.reduce(function (ptr, step) {
                return ptr && ptr.hasOwnProperty(step) ? ptr[step] : undefined;
            }, data)[varName] = value;
        }
    }
    fixHTMLTags(xmlString) {
        return xmlString.replace(/\<(?!area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)([a-z|A-Z|_|\-|:|0-9]+)([^>]*)\/\>/gm, '<$1$2></$1>');
    }
}
function loopMovieMoviesMovies(self, docElm, elm, items) {
    const fn = function () {
        elm.appendChild(docElm.createTextNode(`
    `));
        elm.appendChild((function () {
            const elm = docElm.createElement('li');
            elm.setAttribute('class', 'movie');
            elm.appendChild(docElm.createTextNode(`
    `));
            elm.appendChild((function () {
                const elm = docElm.createElement('span');
                elm.setAttribute('class', 'movie_title');
                elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'movie.Title')); return node; })());
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
    `));
            elm.appendChild((function () {
                const elm = docElm.createElement('img');
                elm.setAttribute('class', 'movie_poster');
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
    `));
            {
                let node = self._getPrecedingOrSelf(elm), tmpAttrs;
                node.setAttribute('src', self._getValue(self.data, 'movie.Poster'));
            }
            elm.appendChild(docElm.createTextNode(`
    `));
            elm.appendChild((function () {
                const elm = docElm.createElement('time');
                elm.setAttribute('class', 'movie_year');
                elm.appendChild((function () { const node = docElm.createTextNode(self._getValue(self.data, 'movie.Year')); return node; })());
                return elm;
            })());
            elm.appendChild(docElm.createTextNode(`
    `));
            return elm;
        })());
        elm.appendChild(docElm.createTextNode(`
`));
    };
    return self._forEach('movie', '$i', elm, fn, items);
}
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
function clone(item) {
    return typeof item === 'object' ? Object.freeze(Array.isArray(item) ? [...item] : Object.assign({}, item)) : item;
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
                    const fn = eval(fnName).bind({}, self, self.docElm, node);
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
                const fn = eval(fnName).bind({}, self, self.docElm, node);
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
function addServerReactiveFunctionality(set = {}) {
    for (let key in set) {
        set[key].forEach((property) => {
            const node = property.node;
            const parentNode = node.parentNode;
            switch (property.type) {
                case 'text':
                    appendAttribute(parentNode, 'data-live-text', `${indexOfChild(parentNode.childNodes, node)}|${key}`);
                    break;
                case 'html':
                    if (!node.getAttribute || !(node.getAttribute('id') === key)) {
                        const parentNode = node.parentNode;
                        appendAttribute(parentNode, 'data-live-html', `${indexOfChild(parentNode.childNodes, node)}|${key}`);
                    }
                    break;
                case 'attribute':
                    if (property.attrName) {
                        appendAttribute(node, 'data-live-attr', `${property.attrName}|${key}`);
                    }
                    else {
                        node.setAttribute('data-live-map', key);
                    }
                    break;
                case 'loop':
                    if (property.details) {
                        const { startAt, items, nodes = [], fnName } = property.details;
                        appendAttribute(node, 'data-live-loop', `${startAt}|${key}|${fnName}|${JSON.stringify(items)}`);
                        nodes.forEach((collection, i) => collection.forEach((item) => appendAttribute(item, 'data-live-loop-child', `${key}|${i}`)));
                    }
                    break;
                case 'conditional':
                    if (property.details) {
                        const { fn = () => { }, startAt, flag, nodes = [], fnName } = property.details;
                        appendAttribute(node, 'data-live-if', `${startAt}|${key}|${fnName}|${flag}`);
                        nodes.forEach((collection, i) => collection.forEach((item) => appendAttribute(item, 'data-live-if-child', `${key}|${i}`)));
                    }
                    break;
            }
        });
    }
}
function indexOfChild(childNodes, child) {
    return Array.prototype.indexOf.call(childNodes, child);
}
function appendAttribute(node, attributeName, newChild) {
    const value = [newChild];
    const attribute = node.getAttribute(attributeName);
    attribute !== null && value.unshift(attribute);
    node.setAttribute(attributeName, value.filter((v) => v.length).join(';'));
}
function addReactiveFunctionality(node, set = {}, domParser) {
    Object.defineProperty(node, 'set', {
        value: getSetProxy(set, domParser),
        configurable: true,
        writable: true,
    });
}
function getSetProxy(map, domParser) {
    return new Proxy(map, {
        get: function (map, prop) {
            var _a, _b;
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
                        return property.attrName && property.node.getAttribute(property.attrName);
                    case 'loop':
                        return (_a = property === null || property === void 0 ? void 0 : property.details) === null || _a === void 0 ? void 0 : _a.items;
                    case 'conditional':
                        return (_b = property === null || property === void 0 ? void 0 : property.details) === null || _b === void 0 ? void 0 : _b.flag;
                }
            }
        },
        set: function (map, prop, value) {
            if (map[prop] === undefined) {
                throw new Error(`property '${prop}' not found`);
            }
            map[prop].forEach((property) => {
                switch (property.type) {
                    case 'text':
                        property.node.data = value;
                        break;
                    case 'html':
                        try {
                            const newNode = typeof value === 'string' ? domParser.parseFromString(value, 'text/xml') : value;
                            if (property.node && property.node.parentNode) {
                                property.node.parentNode.replaceChild(newNode, property.node);
                            }
                            property.node = newNode;
                        }
                        catch (err) {
                            throw new Error(`failed to replace node to ${value} (${err})`);
                        }
                        break;
                    case 'attribute':
                        if (property.attrName) {
                            // single attribute
                            if (value === null) {
                                property.node.removeAttribute(property.attrName);
                            }
                            else {
                                property.node.setAttribute(property.attrName, value);
                            }
                        }
                        else {
                            // attribute map
                            Object.keys(value).forEach((attrName) => property.node.setAttribute(attrName, value[attrName]));
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
function countElementsUntilIndex(items, index) {
    const count = Math.min(index, items.length);
    let acc = 0;
    for (let i = 0; i < count; i++) {
        acc += items[i].length;
    }
    return acc;
}
function updateLoop(property, value) {
    if (property.details) {
        const parent = property.node;
        const { fn, items, nodes = [], startAt } = property.details;
        const instructions = diff(items, value);
        const removedChildren = instructions.removed.map((i) => {
            nodes[i].forEach((node) => parent.removeChild(node));
            return nodes[i];
        });
        fn(instructions.added).forEach((children) => nodes.push(children));
        const updatedNodes = nodes.filter((group) => !removedChildren.includes(group));
        instructions.positions.forEach((i, newIndex) => {
            if (newIndex !== -1) {
                const newP = countElementsUntilIndex(updatedNodes, newIndex);
                const sibling = parent.childNodes.item(startAt + newP);
                if (updatedNodes[i] && (sibling !== updatedNodes[i][0])) {
                    updatedNodes[i].forEach((child) => parent.insertBefore(child, sibling));
                }
            }
        });
        property.details.nodes = updatedNodes;
        property.details.items = clone(value);
    }
}
function toMap(source) {
    const map = new Map();
    if (Array.isArray(source)) {
        return new Map(source.map((v, k) => [k, v]));
    }
    else {
        return new Map(Object.keys(source).map(k => [k, source[k]]));
    }
}
function findIndex(map, item, placed) {
    let index = 0;
    for (let [key, targetItem] of map) {
        if (targetItem === item && !placed.get(key)) {
            return index;
        }
        index++;
    }
}
function diff(source, target) {
    const sourceMap = toMap(source);
    const targetMap = toMap(target);
    const placed = new Map([...targetMap.keys()].map(key => ([key, false])));
    const toPosition = [];
    const output = {
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
        }
        else {
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
            }
            else {
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
// function diff(source: any[], target: any[]): DiffInstructions {
//   const placed: boolean[] = target.map(() => false);
//   const output: DiffInstructions = {
//     removed: [],
//     added: [],
//     positions: [],
//   };
//   source.forEach((item, from) => {
//     const position = target.findIndex((targetItem, j) => targetItem === item && !placed[j]);
//     if (position === -1) {
//       output.removed.push(from);
//     } else {
//       output.positions.push(position);
//       placed[position] = true;
//     }
//   });
//   output.removed = output.removed.sort().reverse();
//   target.forEach((item, position) => {
//     if (!placed[position]) {
//       output.positions.push(position);
//       output.added.push(item);
//     }
//   });
//   return output;
// }
function updateConditional(property, value) {
    if (property.details) {
        const parent = property.node;
        let updatedNodes = [];
        const { fn = () => [], flag, nodes = [], startAt } = property.details;
        if (flag && !value) {
            while (nodes[0].length) {
                const child = nodes[0].pop();
                child && parent.removeChild(child);
            }
        }
        else if (!flag && value) {
            updatedNodes = fn(value);
            if (parent.childNodes.length < startAt) {
                property.details.startAt = parent.childNodes.length - updatedNodes[0].length;
            }
            else {
                const sibling = parent.childNodes.item(startAt);
                updatedNodes[0].forEach((node) => parent.insertBefore(node, sibling));
            }
        }
        property.details.nodes = updatedNodes;
        property.details.flag = value;
    }
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
//# sourceMappingURL=movie-search.template.js.map