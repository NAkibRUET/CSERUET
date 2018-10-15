"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _addYears = _interopRequireDefault(require("date-fns/addYears"));

var _differenceInMilliseconds = _interopRequireDefault(require("date-fns/differenceInMilliseconds"));

var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _endOfYear = _interopRequireDefault(require("date-fns/endOfYear"));

var _format2 = _interopRequireDefault(require("date-fns/format"));

var _getHours = _interopRequireDefault(require("date-fns/getHours"));

var _getSeconds = _interopRequireDefault(require("date-fns/getSeconds"));

var _getYear = _interopRequireDefault(require("date-fns/getYear"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _isEqual2 = _interopRequireDefault(require("date-fns/isEqual"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _isValid = _interopRequireDefault(require("date-fns/isValid"));

var _parse = _interopRequireDefault(require("date-fns/parse"));

var _setHours = _interopRequireDefault(require("date-fns/setHours"));

var _setMinutes = _interopRequireDefault(require("date-fns/setMinutes"));

var _setSeconds = _interopRequireDefault(require("date-fns/setSeconds"));

var _setYear = _interopRequireDefault(require("date-fns/setYear"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _startOfYear = _interopRequireDefault(require("date-fns/startOfYear"));

// date-fns < 2.0.0-alpha.8
var DateFnsUtils =
/*#__PURE__*/
function () {
  function DateFnsUtils(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale;

    this.addDays = _addDays.default;
    this.isValid = _isValid.default;
    this.getDiff = _differenceInMilliseconds.default;
    this.isAfter = _isAfter.default;
    this.isBefore = _isBefore.default;
    this.startOfDay = _startOfDay.default;
    this.endOfDay = _endOfDay.default;
    this.getHours = _getHours.default;
    this.setHours = _setHours.default;
    this.setMinutes = _setMinutes.default;
    this.getSeconds = _getSeconds.default;
    this.setSeconds = _setSeconds.default;
    this.isSameDay = _isSameDay.default;
    this.getStartOfMonth = _startOfMonth.default;
    this.getYear = _getYear.default;
    this.setYear = _setYear.default;
    this.dateTime12hFormat = 'MMMM Do hh:mm a';
    this.dateTime24hFormat = 'MMMM Do HH:mm';
    this.time12hFormat = 'hh:mm A';
    this.time24hFormat = 'HH:mm';
    this.dateFormat = 'MMMM Do';
    this.locale = locale;
  }

  var _proto = DateFnsUtils.prototype;

  _proto.date = function date(value) {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  };

  _proto.parse = function parse(value, formatString) {
    if (value === '') {
      return null;
    }

    return (0, _parse.default)(value, formatString, new Date());
  };

  _proto.format = function format(date, formatString) {
    return (0, _format2.default)(date, formatString, {
      locale: this.locale
    });
  };

  _proto.isEqual = function isEqual(date, comparing) {
    if (date === null && comparing === null) {
      return true;
    }

    return (0, _isEqual2.default)(date, comparing);
  };

  _proto.isNull = function isNull(date) {
    return date === null;
  };

  _proto.isAfterDay = function isAfterDay(date, value) {
    return (0, _isAfter.default)(date, (0, _endOfDay.default)(value));
  };

  _proto.isBeforeDay = function isBeforeDay(date, value) {
    return (0, _isBefore.default)(date, (0, _startOfDay.default)(value));
  };

  _proto.isBeforeYear = function isBeforeYear(date, value) {
    return (0, _isBefore.default)(date, (0, _startOfYear.default)(value));
  };

  _proto.isAfterYear = function isAfterYear(date, value) {
    return (0, _isAfter.default)(date, (0, _endOfYear.default)(value));
  };

  _proto.formatNumber = function formatNumber(num) {
    return num;
  };

  _proto.getMinutes = function getMinutes(date) {
    return date.getMinutes();
  };

  _proto.getMonth = function getMonth(date) {
    return date.getMonth();
  };

  _proto.getMeridiemText = function getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  };

  _proto.getNextMonth = function getNextMonth(date) {
    return (0, _addMonths.default)(date, 1);
  };

  _proto.getPreviousMonth = function getPreviousMonth(date) {
    return (0, _addMonths.default)(date, -1);
  };

  _proto.mergeDateAndTime = function mergeDateAndTime(date, time) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  };

  _proto.getWeekdays = function getWeekdays() {
    var _this = this;

    var now = new Date();
    return (0, _eachDayOfInterval.default)({
      start: (0, _startOfWeek.default)(now, {
        locale: this.locale
      }),
      end: (0, _endOfWeek.default)(now, {
        locale: this.locale
      })
    }, {
      locale: this.locale
    }).map(function (day) {
      return (0, _format2.default)(day, 'dd', {
        locale: _this.locale
      });
    });
  };

  _proto.getWeekArray = function getWeekArray(date) {
    var start = (0, _startOfWeek.default)((0, _startOfMonth.default)(date), {
      locale: this.locale
    });
    var end = (0, _endOfWeek.default)((0, _endOfMonth.default)(date), {
      locale: this.locale
    });
    var nestedWeeks = [];
    var count = 0;
    var current = start;

    while ((0, _isBefore.default)(current, end)) {
      var weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = (0, _addDays.default)(current, 1);
      count += 1;
    }

    return nestedWeeks;
  };

  _proto.getYearRange = function getYearRange(start, end) {
    var startDate = (0, _startOfYear.default)(new Date(start));
    var endDate = (0, _endOfYear.default)(new Date(end));
    var years = [];
    var current = startDate;

    while ((0, _isBefore.default)(current, endDate)) {
      years.push(current);
      current = (0, _addYears.default)(current, 1);
    }

    return years;
  }; // displaying methpds


  _proto.getCalendarHeaderText = function getCalendarHeaderText(date) {
    return (0, _format2.default)(date, 'MMMM YYYY', {
      locale: this.locale
    });
  };

  _proto.getYearText = function getYearText(date) {
    return (0, _format2.default)(date, 'YYYY', {
      locale: this.locale
    });
  };

  _proto.getDatePickerHeaderText = function getDatePickerHeaderText(date) {
    return (0, _format2.default)(date, 'ddd, MMM D', {
      locale: this.locale
    });
  };

  _proto.getDateTimePickerHeaderText = function getDateTimePickerHeaderText(date) {
    return (0, _format2.default)(date, 'MMM D', {
      locale: this.locale
    });
  };

  _proto.getDayText = function getDayText(date) {
    return (0, _format2.default)(date, 'D', {
      locale: this.locale
    });
  };

  _proto.getHourText = function getHourText(date, ampm) {
    return (0, _format2.default)(date, ampm ? 'hh' : 'HH', {
      locale: this.locale
    });
  };

  _proto.getMinuteText = function getMinuteText(date) {
    return (0, _format2.default)(date, 'mm', {
      locale: this.locale
    });
  };

  _proto.getSecondText = function getSecondText(date) {
    return (0, _format2.default)(date, 'ss', {
      locale: this.locale
    });
  };

  return DateFnsUtils;
}();

exports.default = DateFnsUtils;