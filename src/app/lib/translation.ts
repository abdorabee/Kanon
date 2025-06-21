interface Translation {
    searchResults: string;
    caseNumber: string;
    table: string;
    plaintiff: string;
    defendant: string;
    judgment: string;
    noResults: string;
    backToHome: string;
    view: string;
    hide: string;
    language: string;
    english: string;
    arabic: string;
  }

  // Server-side translation function
  export async function getServerTranslation(lang: 'en' | 'ar' = 'en'): Promise<Translation> {
    const defaultTranslation: Translation = {
      searchResults: 'Search Results',
      caseNumber: 'Case Number',
      table: 'Table',
      plaintiff: 'Plaintiff',
      defendant: 'Defendant(s)',
      judgment: 'Judgment',
      noResults: 'No case details found for your query.',
      backToHome: 'Back to Home',
      view: 'View',
      hide: 'Hide',
      language: 'Language',
      english: 'EN',
      arabic: 'AR',
    };

    try {
      const response = await fetch(`http://localhost:3000/translation/${lang}.json`, {
        cache: 'force-cache', // Static file caching
      });
      if (!response.ok) throw new Error('Translation file not found');
      return await response.json();
    } catch (error) {
      console.error('Server translation error:', error);
      return defaultTranslation;
    }
  }

  // Client-side translation function
  export function getClientTranslation(lang: 'en' | 'ar', setTranslations: (t: Translation) => void) {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/translation/${lang}.json`);
        if (!response.ok) throw new Error('Translation file not found');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Client translation error:', error);
        setTranslations({
          searchResults: 'Search Results',
          caseNumber: 'Case Number',
          table: 'Table',
          plaintiff: 'Plaintiff',
          defendant: 'Defendant(s)',
          judgment: 'Judgment',
          noResults: 'No case details found for your query.',
          backToHome: 'Back to Home',
          view: 'View',
          hide: 'Hide',
          language: 'Language',
          english: 'EN',
          arabic: 'AR',
        });
      }
    };
    loadTranslations();
  }