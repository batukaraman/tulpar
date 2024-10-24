import FuzzySearch from 'fuzzy-search';

export class FuzzySearchService<T extends string | object> {
  private fuzzySearch: FuzzySearch<T>;

  constructor(items: T[]) {
    this.fuzzySearch = new FuzzySearch(items, ['name'], {caseSensitive: false});
  }

  search(query: string): T[] {
    return this.fuzzySearch.search(query);
  }
}
