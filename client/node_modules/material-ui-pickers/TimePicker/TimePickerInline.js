"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePickerInline = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InlineWrapper = _interopRequireDefault(require("../wrappers/InlineWrapper"));

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var _BasePicker = _interopRequireDefault(require("../_shared/BasePicker"));

var TimePickerInline = function TimePickerInline(props) {
  var value = props.value,
      format = props.format,
      onChange = props.onChange,
      ampm = props.ampm,
      forwardedRef = props.forwardedRef,
      seconds = props.seconds,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, ["value", "format", "onChange", "ampm", "forwardedRef", "seconds"]);
  return _react.default.createElement(_BasePicker.default, (0, _extends2.default)({}, props, {
    autoOk: true
  }), function (_ref) {
    var date = _ref.date,
        utils = _ref.utils,
        handleChange = _ref.handleChange,
        handleTextFieldChange = _ref.handleTextFieldChange,
        isAccepted = _ref.isAccepted,
        pick12hOr24hFormat = _ref.pick12hOr24hFormat;
    return _react.default.createElement(_InlineWrapper.default, (0, _extends2.default)({
      ref: forwardedRef,
      value: value,
      onChange: handleTextFieldChange,
      isAccepted: isAccepted,
      format: pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)
    }, other), _react.default.createElement(_TimePicker.default, {
      date: date,
      onChange: handleChange,
      ampm: ampm,
      seconds: seconds
    }));
  });
};

exports.TimePickerInline = TimePickerInline;
TimePickerInline.propTypes = {
  value: _propTypes2.default.date,
  format: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  ampm: _propTypes.default.bool,
  seconds: _propTypes.default.bool,
  forwardedRef: _propTypes.default.func
};
TimePickerInline.defaultProps = {
  ampm: true,
  value: new Date(),
  format: undefined,
  forwardedRef: undefined,
  seconds: false
};

var _default = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(TimePickerInline, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }));
});

exports.default = _default;