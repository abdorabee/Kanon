module.exports = {
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/[lang]': ['home'],
    '/[lang]/about': ['common'],
    '/[lang]/features': ['common'],
    '/[lang]/contact': ['common']
  },
  loadLocaleFrom: (lang, ns) => 
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
}
