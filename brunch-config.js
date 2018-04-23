exports.config = {
  paths: {
    public: 'web',
    watched: ['frontend']
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
