(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/components/App/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Example = require('src/containers/Example');

var _Example2 = _interopRequireDefault(_Example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Code
 */
/*
 * Npm import
 */
var App = function App() {
  return _react2.default.createElement(
    'div',
    { id: 'hello' },
    'Hello World!',
    _react2.default.createElement(_Example2.default, null)
  );
};

/*
 * Export default
 */


/*
 * Local import
 */
exports.default = App;
});

require.register("src/components/Example/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Local import
 */

/**
 * Code
 */
/**
 * Npm import
 */
var Example = function Example(_ref) {
  var message = _ref.message,
      doSomething = _ref.doSomething;
  return _react2.default.createElement(
    'div',
    { id: 'example', onClick: doSomething },
    message
  );
};

Example.propTypes = {
  message: _propTypes2.default.string.isRequired,
  doSomething: _propTypes2.default.func.isRequired
};
/**
 * Export
 */
exports.default = Example;
});

require.register("src/containers/Example.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _Example = require('src/components/Example');

var _Example2 = _interopRequireDefault(_Example);

var _reducer = require('src/store/reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Code
 */
// State
// mapStateToProps met à dispo (state, ownProps)
// rien envoyer >> const mapStateToProps = null;


/**
 * Local import
 */
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    message: state.message
  };
};

// Actions
// mapDispatchToProps met à dispo (dispatch, ownProps)
// rien envoyer >> const mapDispatchToProps = {};


// Action Creators
/**
 * Npm import
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    doSomething: function doSomething() {
      dispatch((0, _reducer.doSomething)());
    }
  };
};

// Container
var ExampleContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Example2.default);

/* 2 temps
const createContainer = connect(mapStateToProps, mapDispatchToProps);
const ExampleContainer = createContainer(Example);
*/

/**
 * Export
 */
exports.default = ExampleContainer;
});

require.register("src/index.js", function(exports, require, module) {
'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _App = require('src/components/App');

var _App2 = _interopRequireDefault(_App);

var _store = require('src/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Code
 */


/*
 * Local import
 */
/*
 * Npm import
 */
var rootComponent = _react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(_App2.default, null)
);

document.addEventListener('DOMContentLoaded', function () {
  (0, _reactDom.render)(rootComponent, document.getElementById('root'));
});
});

require.register("src/store/exampleMiddleware.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*
 * Middleware
 */
exports.default = function (store) {
  return function (next) {
    return function (action) {
      // Code
      console.log(store.getState());

      // On passe au voisin
      next(action);
    };
  };
};
});

require.register("src/store/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducer = require('src/store/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _exampleMiddleware = require('./exampleMiddleware');

var _exampleMiddleware2 = _interopRequireDefault(_exampleMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Code
 */
// DevTools


/*
 * Local import
 */
// Reducer
var devTools = [];

// Middleware
/*
 * Npm import
 */

if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

// Middleware vers Enhancers
var exampleEnhancer = (0, _redux.applyMiddleware)(_exampleMiddleware2.default);
var enhancers = _redux.compose.apply(undefined, [exampleEnhancer].concat(devTools));

// createStore
var store = (0, _redux.createStore)(_reducer2.default, enhancers);

/*
 * Export
 */
exports.default = store;
});

require.register("src/store/reducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Initial State
 */
var initialState = {
  message: 'Coucou'
};

/**
 * Types
 */
var DO_SOMETHING = 'DO_SOMETHING';

/**
 * Reducer
 */
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case DO_SOMETHING:
      return _extends({}, state);

    default:
      return state;
  }
};

/**
 * Action Creators
 */
var doSomething = exports.doSomething = function doSomething() {
  return {
    type: DO_SOMETHING
  };
};

/**
 * Export
 */
exports.default = reducer;
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map