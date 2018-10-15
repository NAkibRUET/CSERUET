"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _MuiPickersUtilsProvider = require("../utils/MuiPickersUtilsProvider");

var WithUtils = function WithUtils() {
  return function (Component) {
    var withUtils = function withUtils(props) {
      return _react.default.createElement(_MuiPickersUtilsProvider.MuiPickersContextConsumer, null, function (utils) {
        return _react.default.createElement(Component, (0, _extends2.default)({
          utils: utils
        }, props));
      });
    };

    withUtils.displayName = "WithUtils(" + (Component.displayName || Component.name) + ")";
    return withUtils;
  };
};

var _default = WithUtils;
exports.default = _default;