"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MuiPickersContextConsumer = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _React$createContext = _react.default.createContext(),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

var MuiPickersContextConsumer = Consumer;
exports.MuiPickersContextConsumer = MuiPickersContextConsumer;

var MuiPickersUtilsProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(MuiPickersUtilsProvider, _Component);

  function MuiPickersUtilsProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      utils: null
    };
    return _this;
  }

  MuiPickersUtilsProvider.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var Utils = _ref.utils,
        locale = _ref.locale,
        moment = _ref.moment;
    return {
      utils: new Utils({
        locale: locale,
        moment: moment
      })
    };
  };

  var _proto = MuiPickersUtilsProvider.prototype;

  _proto.render = function render() {
    return _react.default.createElement(Provider, {
      value: this.state.utils
    }, this.props.children);
  };

  return MuiPickersUtilsProvider;
}(_react.Component);

exports.default = MuiPickersUtilsProvider;
MuiPickersUtilsProvider.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  utils: _propTypes.default.func.isRequired,
  locale: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  children: _propTypes.default.oneOfType([_propTypes.default.element.isRequired, _propTypes.default.arrayOf(_propTypes.default.element.isRequired)]).isRequired,
  moment: _propTypes.default.func
};
MuiPickersUtilsProvider.defaultProps = {
  locale: undefined,
  moment: undefined
};