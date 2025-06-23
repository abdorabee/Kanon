/** @type {import('next-translate-plugin').I18nConfig} */
module.exports = {
    locales: ['en', 'ar'], // Specify your supported locales
    defaultLocale: 'en',  // Specify your default locale
    defaultNS: 'common', // Default namespace if not specified
    // loader: false, // Disable legacy loader if you exclusively use App Router per documentation
    logBuild: true, // Recommended to see what next-translate is doing during build
    pages: {
      '*': ['common'], // Load 'common' namespace for all pages
    },
    // Optional: If you want to customize the directory for locale files
    // localePath: 'translations', 
    // logger: undefined, // To disable all logs from next-translate
    // loadLocaleFrom: (locale, namespace) => { // Custom function to load translations
    //   return import(`./locales/${locale}/${namespace}.json`).then((m) => m.default)
    // }
  };
  