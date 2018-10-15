"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _luxon = require("luxon");

var LuxonUtils =
/*#__PURE__*/
function () {
  function LuxonUtils(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale;

    this.parse = _luxon.DateTime.fromFormat;
    this.dateTime12hFormat = 'ff';
    this.dateTime24hFormat = 'f';
    this.time12hFormat = 't';
    this.time24hFormat = 'T';
    this.dateFormat = 'DD';
    this.locale = locale || 'en';
  }

  var _proto = LuxonUtils.prototype;

  _proto.date = function date(value) {
    if (value instanceof Date) {
      return _luxon.DateTime.fromJSDate(value);
    }

    if (typeof value === 'string') {
      return _luxon.DateTime.fromJSDate(new Date(value));
    }

    if (value instanceof _luxon.DateTime) {
      return value;
    }

    return _luxon.DateTime.local();
  };

  _proto.addDays = function addDays(date, count) {
    if (count < 0) {
      return date.minus({
        days: Math.abs(count)
      });
    }

    return date.plus({
      days: count
    });
  };

  _proto.isValid = function isValid(date) {
    return date.isValid;
  };

  _proto.isEqual = function isEqual(value, comparing) {
    if (value === null && comparing === null) {
      return true;
    }

    return value === comparing;
  };

  _proto.isSameDay = function isSameDay(value, comparing) {
    return value.hasSame(comparing, 'day');
  };

  _proto.isAfter = function isAfter(value, comparing) {
    return value > comparing;
  };

  _proto.isAfterDay = function isAfterDay(value, comparing) {
    var diff = value.diff(comparing, 'days').toObject();
    return diff.days > 0;
  };

  _proto.isAfterYear = function isAfterYear(value, comparing) {
    var diff = value.diff(comparing, 'years').toObject();
    return diff.years > 0;
  };

  _proto.isBefore = function isBefore(value, comparing) {
    return value < comparing;
  };

  _proto.isBeforeDay = function isBeforeDay(value, comparing) {
    var diff = value.diff(comparing, 'days').toObject();
    return diff.days < 0;
  };

  _proto.isBeforeYear = function isBeforeYear(value, comparing) {
    var diff = value.diff(comparing, 'years').toObject();
    return diff.years < 0;
  };

  _proto.getDiff = function getDiff(value, comparing) {
    if (typeof comparing === 'string') {
      comparing = _luxon.DateTime.fromJSDate(new Date(comparing));
    }

    return value.diff(comparing, 'milliseconds');
  };

  _proto.startOfDay = function startOfDay(value) {
    return value.startOf('day');
  };

  _proto.endOfDay = function endOfDay(value) {
    return value.endOf('day');
  };

  _proto.format = function format(date, _format) {
    return date.setLocale(this.locale).toFormat(_format);
  };

  _proto.formatNumber = function formatNumber(number) {
    return String(number);
  };

  _proto.getHours = function getHours(value) {
    return value.get('hour');
  };

  _proto.setHours = function setHours(value, count) {
    return value.set({
      hour: count
    });
  };

  _proto.getMinutes = function getMinutes(value) {
    return value.get('minute');
  };

  _proto.setMinutes = function setMinutes(value, count) {
    return value.set({
      minute: count
    });
  };

  _proto.getSeconds = function getSeconds(value) {
    return value.get('second');
  };

  _proto.setSeconds = function setSeconds(value, count) {
    return value.set({
      second: count
    });
  };

  _proto.getMonth = function getMonth(value) {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get('month') - 1;
  };

  _proto.getYear = function getYear(value) {
    return value.get('year');
  };

  _proto.setYear = function setYear(value, year) {
    return value.set({
      year: year
    });
  };

  _proto.mergeDateAndTime = function mergeDateAndTime(date, time) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  };

  _proto.getStartOfMonth = function getStartOfMonth(value) {
    return value.startOf('month');
  };

  _proto.getNextMonth = function getNextMonth(value) {
    return value.plus({
      months: 1
    });
  };

  _proto.getPreviousMonth = function getPreviousMonth(value) {
    return value.minus({
      months: 1
    });
  };

  _proto.getWeekdays = function getWeekdays() {
    return _luxon.Info.weekdaysFormat('narrow', {
      locale: this.locale
    });
  };

  _proto.getWeekArray = function getWeekArray(date) {
    var _date$endOf$endOf$dif = date.endOf('month').endOf('week').diff(date.startOf('month').startOf('week'), 'days').toObject(),
        days = _date$endOf$endOf$dif.days;

    var weeks = [];
    new Array(Math.round(days)).fill().map(function (_, i) {
      return i;
    }).map(function (day) {
      return date.startOf('month').startOf('week').plus({
        days: day
      });
    }).forEach(function (v, i) {
      if (i === 0 || i % 7 === 0 && i > 6) {
        weeks.push([v]);
        return;
      }

      weeks[weeks.length - 1].push(v);
    });
    return weeks;
  };

  _proto.getYearRange = function getYearRange(start, end) {
    start = this.date(start);
    end = this.date(end).plus({
      years: 1
    });

    var _end$diff$toObject = end.diff(start, 'years').toObject(),
        years = _end$diff$toObject.years;

    if (!years || years <= 0) {
      return [];
    }

    return new Array(Math.round(years)).fill().map(function (_m, i) {
      return i;
    }).map(function (year) {
      return start.plus({
        years: year
      });
    });
  };

  _proto.getMeridiemText = function getMeridiemText(ampm) {
    return _luxon.Info.meridiems({
      locale: this.locale
    }).find(function (v) {
      return v.toLowerCase() === ampm.toLowerCase();
    });
  };

  _proto.getCalendarHeaderText = function getCalendarHeaderText(date) {
    return this.format(date, 'MMMM yyyy');
  };

  _proto.getDatePickerHeaderText = function getDatePickerHeaderText(date) {
    return this.format(date, 'ccc, MMM d');
  };

  _proto.getDateTimePickerHeaderText = function getDateTimePickerHeaderText(date) {
    return this.format(date, 'MMM d');
  };

  _proto.getDayText = function getDayText(date) {
    return this.format(date, 'd');
  };

  _proto.getHourText = function getHourText(date, ampm) {
    if (ampm) {
      return date.toFormat('hh');
    }

    return date.toFormat('HH');
  };

  _proto.getMinuteText = function getMinuteText(date) {
    return date.toFormat('mm');
  };

  _proto.getSecondText = function getSecondText(date) {
    return date.toFormat('ss');
  };

  _proto.getYearText = function getYearText(date) {
    return date.toFormat('yyyy');
  };

  _proto.isNull = function isNull(date) {
    return date === null;
  };

  return LuxonUtils;
}();

exports.default = LuxonUtils;