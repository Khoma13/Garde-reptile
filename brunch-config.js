exports.config = {
  paths: {
    'watched': ['app']
  },
  files: {
    stylesheets: {
      joinTo: 'css/app.css'
    },
    javascripts: {
      joinTo: 'js/app.js'
    }
  },
  plugins: {
    postcss: {
      processors: [require('autoprefixer')]
    }
  }
};
