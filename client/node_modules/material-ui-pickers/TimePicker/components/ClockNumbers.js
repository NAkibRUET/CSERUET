"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinutesNumbers = exports.getHourNumbers = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ClockNumber = _interopRequireDefault(require("./ClockNumber"));

var getHourNumbers = function getHourNumbers(_ref) {
  var ampm = _ref.ampm,
      utils = _ref.utils,
      date = _ref.date;
  var currentHours = utils.getHours(date);
  var hourNumbers = [];
  var startHour = ampm ? 1 : 0;
  var endHour = ampm ? 12 : 23;

  var isSelected = function isSelected(hour) {
    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (var hour = startHour; hour <= endHour; hour += 1) {
    var label = hour.toString();

    if (hour === 0) {
      label = '00';
    }

    var props = {
      index: hour,
      label: utils.formatNumber(label),
      selected: isSelected(hour),
      isInner: !ampm && (hour === 0 || hour > 12)
    };
    hourNumbers.push(_react.default.createElement(_ClockNumber.default, (0, _extends2.default)({
      key: hour
    }, props)));
  }

  return hourNumbers;
};

exports.getHourNumbers = getHourNumbers;

var getMinutesNumbers = function getMinutesNumbers(_ref2) {
  var value = _ref2.value,
      utils = _ref2.utils;
  var f = utils.formatNumber;
  return [_react.default.createElement(_ClockNumber.default, {
    label: f('00'),
    selected: value === 0,
    index: 12,
    key: 12
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('05'),
    selected: value === 5,
    index: 1,
    key: 1
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('10'),
    selected: value === 10,
    index: 2,
    key: 2
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('15'),
    selected: value === 15,
    index: 3,
    key: 3
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('20'),
    selected: value === 20,
    index: 4,
    key: 4
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('25'),
    selected: value === 25,
    index: 5,
    key: 5
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('30'),
    selected: value === 30,
    index: 6,
    key: 6
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('35'),
    selected: value === 35,
    index: 7,
    key: 7
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('40'),
    selected: value === 40,
    index: 8,
    key: 8
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('45'),
    selected: value === 45,
    index: 9,
    key: 9
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('50'),
    selected: value === 50,
    index: 10,
    key: 10
  }), _react.default.createElement(_ClockNumber.default, {
    label: f('55'),
    selected: value === 55,
    index: 11,
    key: 11
  })];
};

exports.getMinutesNumbers = getMinutesNumbers;