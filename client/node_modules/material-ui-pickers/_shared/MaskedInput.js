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

var _reactTextMask = _interopRequireDefault(require("react-text-mask"));

var Input =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Input, _PureComponent);

  function Input() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        inputRef = _this$props.inputRef,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["inputRef"]);
    return this.props.mask ? _react.default.createElement(_reactTextMask.default, (0, _extends2.default)({}, props, {
      ref: inputRef
    })) : _react.default.createElement("input", (0, _extends2.default)({}, props, {
      ref: inputRef
    }));
  };

  return Input;
}(_react.PureComponent);

exports.default = Input;
Input.propTypes = {
  mask: _propTypes.default.any,
  inputRef: _propTypes.default.func.isRequired
};
Input.defaultProps = {
  mask: undefined
};