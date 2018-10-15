"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePickerView = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Clock = _interopRequireDefault(require("./Clock"));

var clockType = _interopRequireWildcard(require("../../constants/clock-types"));

var _WithUtils = _interopRequireDefault(require("../../_shared/WithUtils"));

var _ClockNumbers = require("./ClockNumbers");

var TimePickerView =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TimePickerView, _PureComponent);

  function TimePickerView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _this.getViewProps = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          ampm = _this$props.ampm,
          date = _this$props.date,
          utils = _this$props.utils;

      switch (type) {
        case clockType.HOURS:
          return {
            value: utils.getHours(date),
            children: (0, _ClockNumbers.getHourNumbers)({
              date: date,
              ampm: ampm,
              utils: utils
            }),
            onChange: _this.handleHourChange
          };

        case clockType.MINUTES:
          var minutesValue = utils.getMinutes(date);
          return {
            value: minutesValue,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              value: minutesValue,
              utils: utils
            }),
            onChange: _this.handleMinutesChange
          };

        case clockType.SECONDS:
          var secondsValue = utils.getSeconds(date);
          return {
            value: secondsValue,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              value: secondsValue,
              utils: utils
            }),
            onChange: _this.handleSecondsChange
          };

        default:
          throw new Error('You must provide the type for TimePickerView');
      }
    };

    _this.handleHourChange = function (hours, isFinish) {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          utils = _this$props2.utils;
      var updatedTime = utils.setHours(date, hours);

      _this.props.onHourChange(updatedTime, isFinish);
    };

    _this.handleMinutesChange = function (minutes, isFinish) {
      var _this$props3 = _this.props,
          date = _this$props3.date,
          utils = _this$props3.utils;
      var updatedTime = utils.setMinutes(date, minutes);

      _this.props.onMinutesChange(updatedTime, isFinish);
    };

    _this.handleSecondsChange = function (seconds, isFinish) {
      var _this$props4 = _this.props,
          date = _this$props4.date,
          utils = _this$props4.utils;
      var updatedTime = utils.setSeconds(date, seconds);

      _this.props.onSecondsChange(updatedTime, isFinish);
    };

    return _this;
  }

  var _proto = TimePickerView.prototype;

  _proto.render = function render() {
    var _this$props5 = this.props,
        ampm = _this$props5.ampm,
        type = _this$props5.type;
    var viewProps = this.getViewProps();
    return _react.default.createElement(_Clock.default, (0, _extends2.default)({
      type: type,
      ampm: ampm
    }, viewProps));
  };

  return TimePickerView;
}(_react.PureComponent);

exports.TimePickerView = TimePickerView;
TimePickerView.propTypes = {
  date: _propTypes.default.object.isRequired,
  onHourChange: _propTypes.default.func.isRequired,
  onMinutesChange: _propTypes.default.func.isRequired,
  onSecondsChange: _propTypes.default.func.isRequired,
  utils: _propTypes.default.object.isRequired,
  ampm: _propTypes.default.bool,
  type: _propTypes.default.oneOf(Object.keys(clockType).map(function (key) {
    return clockType[key];
  })).isRequired
};
TimePickerView.defaultProps = {
  ampm: true
};

var _default = (0, _WithUtils.default)()(TimePickerView);

exports.default = _default;