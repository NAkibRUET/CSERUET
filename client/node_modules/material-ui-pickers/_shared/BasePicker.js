"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BasePickerHoc = void 0;

var _compose = _interopRequireDefault(require("recompose/compose"));

var _lifecycle = _interopRequireDefault(require("recompose/lifecycle"));

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _withHandlers = _interopRequireDefault(require("recompose/withHandlers"));

var _toRenderProps = _interopRequireDefault(require("recompose/toRenderProps"));

var _withState = _interopRequireDefault(require("recompose/withState"));

var _WithUtils = _interopRequireDefault(require("./WithUtils"));

var getInitialDate = function getInitialDate(_ref) {
  var utils = _ref.utils,
      value = _ref.value,
      initialFocusedDate = _ref.initialFocusedDate;
  var initialDate = value || initialFocusedDate || utils.date();
  var date = utils.date(initialDate);
  return utils.isValid(date) ? date : utils.date();
};

var BasePickerHoc = (0, _compose.default)((0, _WithUtils.default)(), (0, _setDisplayName.default)('BasePicker'), (0, _withState.default)('date', 'changeDate', getInitialDate), (0, _withState.default)('isAccepted', 'handleAcceptedChange', false), (0, _lifecycle.default)({
  componentDidUpdate: function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        utils = _this$props.utils,
        value = _this$props.value;

    if (prevProps.value !== value || prevProps.utils.locale !== utils.locale) {
      this.props.changeDate(getInitialDate(this.props));
    }
  }
}), (0, _withHandlers.default)({
  handleClear: function handleClear(_ref2) {
    var onChange = _ref2.onChange;
    return function () {
      return onChange(null);
    };
  },
  handleAccept: function handleAccept(_ref3) {
    var onChange = _ref3.onChange,
        date = _ref3.date;
    return function () {
      return onChange(date);
    };
  },
  handleSetTodayDate: function handleSetTodayDate(_ref4) {
    var changeDate = _ref4.changeDate,
        utils = _ref4.utils;
    return function () {
      return changeDate(utils.date());
    };
  },
  handleTextFieldChange: function handleTextFieldChange(_ref5) {
    var changeDate = _ref5.changeDate,
        onChange = _ref5.onChange;
    return function (date) {
      if (date === null) {
        onChange(null);
      } else {
        changeDate(date, function () {
          return onChange(date);
        });
      }
    };
  },
  pick12hOr24hFormat: function pick12hOr24hFormat(_ref6) {
    var format = _ref6.format,
        labelFunc = _ref6.labelFunc,
        ampm = _ref6.ampm;
    return function (default12hFormat, default24hFormat) {
      if (format || labelFunc) {
        return format;
      }

      return ampm ? default12hFormat : default24hFormat;
    };
  },
  handleChange: function handleChange(_ref7) {
    var autoOk = _ref7.autoOk,
        changeDate = _ref7.changeDate,
        onChange = _ref7.onChange,
        handleAcceptedChange = _ref7.handleAcceptedChange;
    return function (newDate, isFinish) {
      if (isFinish === void 0) {
        isFinish = true;
      }

      changeDate(newDate, function () {
        if (isFinish && autoOk) {
          onChange(newDate); // pass down accept true, and make it false in the next tick

          handleAcceptedChange(true, function () {
            return handleAcceptedChange(false);
          });
        }
      });
    };
  }
}));
exports.BasePickerHoc = BasePickerHoc;

var _default = (0, _toRenderProps.default)(BasePickerHoc);

exports.default = _default;