var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  if (context.selection.length == 0) {
    (0, _helpers.buildDialog)('Fix Gradient', 'Select a shape with a gradient first').runModal();
    return;
  }

  var selected = context.selection[0];
  var gradient = selected.style().fills().firstObject().gradient();
  var positionArray = [];
  var colorArray = [];

  for (var i = 0; i < gradient.stops().length; i++) {
    var stop = gradient.stops()[i];
    colorArray.push(String(stop.color().immutableModelObject().stringValueWithAlpha(true)));
    positionArray.push(stop.position());
  }

  var handlers = {
    ready: function () {
      function ready() {
        webview.eval('window.renderGradientView(' + String(JSON.stringify(colorArray)) + ', ' + String(JSON.stringify(positionArray)) + ')');
      }

      return ready;
    }(),
    applyGradient: function () {
      function applyGradient(stopArray) {
        var sketchStopArray = [];
        stopArray.forEach(function (stop) {
          sketchStopArray.push(makeStop(stop.position, stop.color));
        });
        gradient.setStops(sketchStopArray);
        webview.close();
      }

      return applyGradient;
    }()
  };

  var webview = (0, _helpers.createWebview)(context, handlers, 'Fix Gradient', 410);
};

var _helpers = __webpack_require__(1);

function makeStop(position, color) {
  return MSGradientStop.stopWithPosition_color_(position, (0, _helpers.makeColor)(color));
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeColor = makeColor;
exports.buildDialog = buildDialog;
exports.createWebview = createWebview;

var _sketchModuleWebView = __webpack_require__(2);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function makeColor(c) {
  return MSImmutableColor.colorWithRed_green_blue_alpha(c[0] / 255, c[1] / 255, c[2] / 255, c[3]).newMutableCounterpart();
}

function buildDialog(message, informativeText) {
  var alert = COSAlertWindow['new']();
  alert.setMessageText(message);
  alert.setInformativeText(informativeText);
  return alert;
}

function createWebview(context, handlers, title, height) {
  var v = 242 / 255;
  var grayColor = NSColor.colorWithRed_green_blue_alpha(v, v, v, 1);
  var options = {
    identifier: 'unique.id',
    x: 0,
    y: 0,
    width: 630,
    height: height,
    background: grayColor,
    blurredBackground: false,
    onlyShowCloseButton: false,
    title: title,
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    handlers: handlers
  };
  return new _sketchModuleWebView2['default'](context, 'index.html', options);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSUUID NSThread NSPanel NSMakeRect NSTexturedBackgroundWindowMask NSTitledWindowMask NSWindowTitleHidden NSClosableWindowMask NSColor NSWindowMiniaturizeButton NSWindowZoomButton NSFloatingWindowLevel WebView COScript NSWindowCloseButton NSFullSizeContentViewWindowMask NSVisualEffectView NSAppearance NSAppearanceNameVibrantLight NSVisualEffectBlendingModeBehindWindow NSLayoutConstraint NSLayoutRelationEqual NSLayoutAttributeLeft NSLayoutAttributeTop NSLayoutAttributeRight NSLayoutAttributeBottom NSResizableWindowMask */
var MochaJSDelegate = __webpack_require__(3)
var parseQuery = __webpack_require__(4)

var coScript = COScript.currentCOScript()

var LOCATION_CHANGED = 'webView:didChangeLocationWithinPageForFrame:'

function addEdgeConstraint (edge, subview, view, constant) {
  view.addConstraint(NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
    subview,
    edge,
    NSLayoutRelationEqual,
    view,
    edge,
    1,
    constant
  ))
}
function fitSubviewToView (subview, view, constants) {
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0])
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1])
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2])
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3])
}

function WebUI (context, frameLocation, options) {
  options = options || {}
  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var panel
  var webView

  // if we already have a panel opened, reuse it
  if (threadDictionary[identifier]) {
    panel = threadDictionary[identifier]
    panel.makeKeyAndOrderFront(null)

    var subviews = panel.contentView().subviews()
    for (var i = 0; i < subviews.length; i++) {
      if (subviews[i].isKindOfClass(WebView.class())) {
        webView = subviews[i]
      }
    }

    if (!webView) {
      throw new Error('Tried to reuse panel but couldn\'t find the webview inside')
    }

    return {
      panel: panel,
      eval: webView.stringByEvaluatingJavaScriptFromString,
      webView: webView
    }
  }

  panel = NSPanel.alloc().init()

  // Window size
  var panelWidth = options.width || 240
  var panelHeight = options.height || 180
  panel.setFrame_display(NSMakeRect(
    options.x || 0,
    options.y || 0,
    panelWidth,
    panelHeight
  ), true)

  // Titlebar
  panel.setTitle(options.title || context.plugin.name())
  if (options.hideTitleBar) {
    panel.setTitlebarAppearsTransparent(true)
    panel.setTitleVisibility(NSWindowTitleHidden)
  }

  // Hide minize and zoom buttons
  if (options.onlyShowCloseButton) {
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
  }

  // Close window callback
  var closeButton = panel.standardWindowButton(NSWindowCloseButton)
  function closeHandler () {
    if (options.onPanelClose) {
      var result = options.onPanelClose()
      if (result === false) {
        return
      }
    }
    panel.close()
    threadDictionary.removeObjectForKey(options.identifier)
    coScript.setShouldKeepAround(false)
  }

  closeButton.setCOSJSTargetFunction(closeHandler)
  closeButton.setAction('callAction:')

  panel.setStyleMask(options.styleMask || (
    options.resizable
    ? (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSResizableWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask)
    : (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask)
  ))
  panel.becomeKeyWindow()
  panel.setLevel(NSFloatingWindowLevel)

  // Appearance
  var backgroundColor = options.background || NSColor.whiteColor()
  panel.setBackgroundColor(backgroundColor)
  if (options.blurredBackground) {
    var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight))
    vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight))
    vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)

    // Add it to the panel
    panel.contentView().addSubview(vibrancy)
    fitSubviewToView(vibrancy, panel.contentView(), [0, 0, 0, 0])
  }

  threadDictionary[identifier] = panel

  if (options.shouldKeepAround !== false) { // Long-running script
    coScript.setShouldKeepAround(true)
  }

  // Add Web View to window
  webView = WebView.alloc().initWithFrame(NSMakeRect(
    0,
    options.hideTitleBar ? -24 : 0,
    options.width || 240,
    (options.height || 180) - (options.hideTitleBar ? 0 : 24)
  ))

  if (options.frameLoadDelegate || options.handlers) {
    var handlers = options.frameLoadDelegate || {}
    if (options.handlers) {
      var lastQueryId
      handlers[LOCATION_CHANGED] = function (webview, frame) {
        var query = webview.windowScriptObject().evaluateWebScript('window.location.hash')
        query = parseQuery(query)
        if (query.pluginAction && query.actionId && query.actionId !== lastQueryId && query.pluginAction in options.handlers) {
          lastQueryId = query.actionId
          try {
            query.pluginArgs = JSON.parse(query.pluginArgs)
          } catch (err) {}
          options.handlers[query.pluginAction].apply(context, query.pluginArgs)
        }
      }
    }
    var frameLoadDelegate = new MochaJSDelegate(handlers)
    webView.setFrameLoadDelegate_(frameLoadDelegate.getClassInstance())
  }
  if (options.uiDelegate) {
    var uiDelegate = new MochaJSDelegate(options.uiDelegate)
    webView.setUIDelegate_(uiDelegate.getClassInstance())
  }

  if (!options.blurredBackground) {
    webView.setOpaque(true)
    webView.setBackgroundColor(backgroundColor)
  } else {
    // Prevent it from drawing a white background
    webView.setDrawsBackground(false)
  }

  // When frameLocation is a file, prefix it with the Sketch Resources path
  if ((/^(?!http|localhost|www|file).*\.html?$/).test(frameLocation)) {
    frameLocation = context.plugin.urlForResourceNamed(frameLocation).path()
  }
  webView.setMainFrameURL_(frameLocation)

  panel.contentView().addSubview(webView)
  fitSubviewToView(webView, panel.contentView(), [
    0, options.hideTitleBar ? 0 : 24, 0, 0
  ])

  panel.center()
  panel.makeKeyAndOrderFront(null)

  return {
    panel: panel,
    eval: webView.stringByEvaluatingJavaScriptFromString,
    webView: webView,
    close: closeHandler
  }
}

WebUI.clean = function () {
  coScript.setShouldKeepAround(false)
}

module.exports = WebUI


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (query) {
  query = query.split('?')[1]
  if (!query) { return }
  query = query.split('&').reduce(function (prev, s) {
    var res = s.split('=')
    if (res.length === 2) {
      prev[decodeURIComponent(res[0])] = decodeURIComponent(res[1])
    }
    return prev
  }, {})
  return query
}


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
