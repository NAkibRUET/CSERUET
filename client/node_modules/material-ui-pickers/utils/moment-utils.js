"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var MomentUtils =
/*#__PURE__*/
function () {
  function MomentUtils(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        moment = _ref.moment;

    this.dateTime12hFormat = 'MMMM Do hh:mm a';
    this.dateTime24hFormat = 'MMMM Do HH:mm';
    this.time12hFormat = 'hh:mm A';
    this.time24hFormat = 'HH:mm';
    this.dateFormat = 'MMMM Do';

    /* eslint-disable-next-line */
    this.moment = moment || _moment.default;
    this.locale = locale;
  }

  var _proto = MomentUtils.prototype;

  _proto.parse = function parse(value, format) {
    return this.moment(value, format, true);
  };

  _proto.date = function date(value, formatString) {
    return this.moment(value, formatString);
  };

  _proto.isValid = function isValid(date) {
    return date.isValid();
  };

  _proto.isNull = function isNull(date) {
    return date.parsingFlags().nullInput;
  };

  _proto.getDiff = function getDiff(date, comparing) {
    return date.diff(comparing);
  };

  _proto.isAfter = function isAfter(date, value) {
    return date.isAfter(value);
  };

  _proto.isBefore = function isBefore(date, value) {
    return date.isBefore(value);
  };

  _proto.isAfterDay = function isAfterDay(date, value) {
    return date.isAfter(value, 'day');
  };

  _proto.isBeforeDay = function isBeforeDay(date, value) {
    return date.isBefore(value, 'day');
  };

  _proto.isBeforeYear = function isBeforeYear(date, value) {
    return date.isBefore(value, 'year');
  };

  _proto.isAfterYear = function isAfterYear(date, value) {
    return date.isAfter(value, 'year');
  };

  _proto.startOfDay = function startOfDay(date) {
    return date.clone().startOf('day');
  };

  _proto.endOfDay = function endOfDay(date) {
    return date.clone().endOf('day');
  };

  _proto.format = function format(date, formatString) {
    return date.format(formatString);
  };

  _proto.formatNumber = function formatNumber(num) {
    return num;
  };

  _proto.getHours = function getHours(date) {
    return date.get('hours');
  };

  _proto.addDays = function addDays(date, count) {
    return count < 0 ? date.clone().subtract(Math.abs(count), 'days') : date.clone().add(count, 'days');
  };

  _proto.setHours = function setHours(date, value) {
    return date.clone().hours(value);
  };

  _proto.getMinutes = function getMinutes(date) {
    return date.get('minutes');
  };

  _proto.setMinutes = function setMinutes(date, value) {
    return date.clone().minutes(value);
  };

  _proto.getSeconds = function getSeconds(date) {
    return date.get('seconds');
  };

  _proto.setSeconds = function setSeconds(date, value) {
    return date.clone().seconds(value);
  };

  _proto.getMonth = function getMonth(date) {
    return date.get('month');
  };

  _proto.isSameDay = function isSameDay(date, comparing) {
    return date.isSame(comparing, 'day');
  };

  _proto.getMeridiemText = function getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  };

  _proto.getStartOfMonth = function getStartOfMonth(date) {
    return date.clone().startOf('month');
  };

  _proto.getNextMonth = function getNextMonth(date) {
    return date.clone().add(1, 'month');
  };

  _proto.getPreviousMonth = function getPreviousMonth(date) {
    return date.clone().subtract(1, 'month');
  };

  _proto.getYear = function getYear(date) {
    return date.get('year');
  };

  _proto.setYear = function setYear(date, year) {
    return date.clone().set('year', year);
  };

  _proto.mergeDateAndTime = function mergeDateAndTime(date, time) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  };

  _proto.getWeekdays = function getWeekdays() {
    var _this = this;

    return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
      return _this.moment().weekday(dayOfWeek).format('dd');
    });
  };

  _proto.isEqual = function isEqual(value, comparing) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  };

  _proto.getWeekArray = function getWeekArray(date) {
    var start = date.clone().startOf('month').startOf('week');
    var end = date.clone().endOf('month').endOf('week');
    var nestedWeeks = [];
    var count = 0;
    var current = start;

    while (current.isBefore(end)) {
      var weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  };

  _proto.getYearRange = function getYearRange(start, end) {
    var startDate = this.moment(start).startOf('year');
    var endDate = this.moment(end).endOf('year');
    var years = [];
    var current = startDate;

    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'year');
    }

    return years;
  }; // displaying methods


  _proto.getCalendarHeaderText = function getCalendarHeaderText(date) {
    return date.format('MMMM YYYY');
  };

  _proto.getYearText = function getYearText(date) {
    return date.format('YYYY');
  };

  _proto.getDatePickerHeaderText = function getDatePickerHeaderText(date) {
    return date.format('ddd, MMM D');
  };

  _proto.getDateTimePickerHeaderText = function getDateTimePickerHeaderText(date) {
    return date.format('MMM D');
  };

  _proto.getDayText = function getDayText(date) {
    return date.format('D');
  };

  _proto.getHourText = function getHourText(date, ampm) {
    return date.format(ampm ? 'hh' : 'HH');
  };

  _proto.getMinuteText = function getMinuteText(date) {
    return date.format('mm');
  };

  _proto.getSecondText = function getSecondText(date) {
    return date.format('ss');
  };

  return MomentUtils;
}();

exports.default = MomentUtils;