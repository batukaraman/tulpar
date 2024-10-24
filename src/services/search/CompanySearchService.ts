import {Company} from '@/models/Company';
import {ISearchService} from './ISearchService';
import {FuzzySearchService} from '@/utils/fuzzySearch';
import {companies} from '@/constants/data';

export class CompanySearchService implements ISearchService<Company> {
  private fuzzySearchService: FuzzySearchService<Company>;

  constructor() {
    this.fuzzySearchService = new FuzzySearchService<Company>(companies);
  }

  async search(query: string): Promise<Company[]> {
    return this.fuzzySearchService.search(query);
  }
}
