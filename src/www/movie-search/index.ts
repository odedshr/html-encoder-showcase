import { getNode } from './movie-search.template.js';
const url = 'https://www.omdbapi.com/?apikey=45e1b942';
const app = getNode({});

export function initApp() {
  const searchField = app.set.searchField as unknown as HTMLInputElement;
  (app.set.searchForm as unknown as HTMLFormElement).onsubmit = () => search(searchField.value) && false;
  return app as Node;
}

async function search(searchValue: string) {
  const response = await fetch(`${url}&s=${searchValue}`);
  const results = await response.json();
  app.set.movies = results.Search;
}
