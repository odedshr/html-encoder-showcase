"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fixHTMLSamples();
            yield addApp('./movie-search/index.js', 'movieApp');
            yield addApp('./todo/index.js', 'todoApp');
            yield addApp('./shopping/index.js', 'shoppingApp');
        }
        catch (err) {
            console.error(err);
        }
    });
}
function fixHTMLSamples() {
    document.querySelectorAll('pre').forEach(elm => {
        elm.textContent = elm.innerHTML
            .replace(/          /g, '')
            .replace(/\?-->/g, '?>')
            .replace(/<!--\?/g, '<?');
    });
}
function addApp(source, targetElement) {
    return __awaiter(this, void 0, void 0, function* () {
        const { initApp } = yield import(source);
        const placeholder = document.getElementById(targetElement);
        if (placeholder) {
            placeholder.appendChild(initApp());
        }
        else {
            console.log(placeholder);
        }
    });
}
window.addEventListener('load', init);
//# sourceMappingURL=index.js.map