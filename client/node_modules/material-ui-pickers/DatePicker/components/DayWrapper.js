"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var DayWrapper =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(DayWrapper, _PureComponent);

  function DayWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    };

    return _this;
  }

  var _proto = DayWrapper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        value = _this$props.value,
        dayInCurrentMonth = _this$props.dayInCurrentMonth,
        disabled = _this$props.disabled,
        onSelect = _this$props.onSelect,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "value", "dayInCurrentMonth", "disabled", "onSelect"]);
    return _react.default.createElement("div", (0, _extends2.default)({
      onClick: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
      onKeyPress: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
      role: "presentation"
    }, other), children);
  };

  return DayWrapper;
}(_react.PureComponent);

DayWrapper.propTypes = {
  children: _propTypes.default.node.isRequired,
  dayInCurrentMonth: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func.isRequired,
  value: _propTypes.default.any.isRequired
};
DayWrapper.defaultProps = {
  dayInCurrentMonth: true,
  disabled: false
};
var _default = DayWrapper;
exports.default = _default;