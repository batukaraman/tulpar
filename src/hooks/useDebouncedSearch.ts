import {ISearchService} from '@/services/search/ISearchService';
import {debounce} from '@/utils/debounce';
import {useState, useEffect} from 'react';

export const useDebouncedSearch = <T>(
  searchService: ISearchService<T>,
  delay: number = 300,
) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);

  const debouncedSearch = debounce(async (text: string) => {
    const searchResults = await searchService.search(text);
    setResults(searchResults);
  }, delay);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        await debouncedSearch(query);
      } else {
        const allResults = await searchService.search('');
        setResults(allResults);
      }
    };

    fetchResults();
    return () => debouncedSearch.cancel();
  }, [query]);

  return {query, setQuery, results};
};
