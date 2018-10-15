"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findClosestEnabledDate = void 0;

/* eslint-disable import/prefer-default-export */
var findClosestEnabledDate = function findClosestEnabledDate(_ref) {
  var date = _ref.date,
      utils = _ref.utils,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      shouldDisableDate = _ref.shouldDisableDate;
  var today = utils.startOfDay(utils.date());
  minDate = minDate && utils.date(minDate);
  maxDate = maxDate && utils.date(maxDate);
  if (disablePast && utils.isBefore(minDate, today)) minDate = today;
  if (disableFuture && utils.isAfter(maxDate, today)) maxDate = today;
  var forward = utils.date(date);
  var backward = utils.date(date);

  if (utils.isBefore(date, minDate)) {
    forward = minDate;
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) backward = maxDate;
    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) forward = null;
    if (backward && utils.isBefore(backward, minDate)) backward = null;

    if (forward) {
      if (!shouldDisableDate(forward)) return forward;
      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) return backward;
      backward = utils.addDays(backward, -1);
    }
  }

  return null;
};

exports.findClosestEnabledDate = findClosestEnabledDate;