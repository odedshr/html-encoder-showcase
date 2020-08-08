var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getNode } from './movie-search.template.js';
const url = 'https://www.omdbapi.com/?apikey=45e1b942';
const app = getNode({});
export function initApp() {
    const searchField = app.set.searchField;
    app.set.searchForm.onsubmit = () => search(searchField.value) && false;
    return app;
}
function search(searchValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${url}&s=${searchValue}`);
        const results = yield response.json();
        app.set.movies = results.Search;
    });
}
//# sourceMappingURL=index.js.map