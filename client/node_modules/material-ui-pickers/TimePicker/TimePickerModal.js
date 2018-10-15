"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePickerModal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ModalWrapper = _interopRequireDefault(require("../wrappers/ModalWrapper"));

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var _BasePicker = _interopRequireDefault(require("../_shared/BasePicker"));

var TimePickerModal = function TimePickerModal(props) {
  var value = props.value,
      format = props.format,
      autoOk = props.autoOk,
      onChange = props.onChange,
      ampm = props.ampm,
      forwardedRef = props.forwardedRef,
      seconds = props.seconds,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, ["value", "format", "autoOk", "onChange", "ampm", "forwardedRef", "seconds"]);
  return _react.default.createElement(_BasePicker.default, props, function (_ref) {
    var date = _ref.date,
        utils = _ref.utils,
        handleAccept = _ref.handleAccept,
        handleChange = _ref.handleChange,
        handleClear = _ref.handleClear,
        handleDismiss = _ref.handleDismiss,
        handleSetTodayDate = _ref.handleSetTodayDate,
        handleTextFieldChange = _ref.handleTextFieldChange,
        isAccepted = _ref.isAccepted,
        pick12hOr24hFormat = _ref.pick12hOr24hFormat;
    return _react.default.createElement(_ModalWrapper.default, (0, _extends2.default)({
      ref: forwardedRef,
      value: value,
      onClear: handleClear,
      onAccept: handleAccept,
      onChange: handleTextFieldChange,
      onDismiss: handleDismiss,
      onSetToday: handleSetTodayDate,
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

exports.TimePickerModal = TimePickerModal;
TimePickerModal.propTypes = {
  /** DateTimepicker value */
  value: _propTypes2.default.date,

  /** Date format string for input */
  format: _propTypes.default.string,

  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: _propTypes.default.func.isRequired,

  /** Auto accept date on minute selection */
  autoOk: _propTypes.default.bool,

  /** 12h/24h view for hour selection clock */
  ampm: _propTypes.default.bool,

  /** Show the seconds view */
  seconds: _propTypes.default.bool,
  forwardedRef: _propTypes.default.func
};
TimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  forwardedRef: undefined,
  seconds: false
};

var _default = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(TimePickerModal, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }));
});

exports.default = _default;