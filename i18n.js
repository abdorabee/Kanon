module.exports = {
  // Basic configuration
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  
  // Define namespaces for each page
  pages: {
    '*': ['common']
  },
  
  // Load translations from JSON files
  loadLocaleFrom: (lang, ns) => 
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
  
  // Fix for App Router compatibility
  loader: 'client',
  
  // Disable the HOC wrapper that's causing the searchParams.lang error
  staticsHoc: false
}
