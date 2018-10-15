"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePicker = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _PickerToolbar = _interopRequireDefault(require("../_shared/PickerToolbar"));

var _ToolbarButton = _interopRequireDefault(require("../_shared/ToolbarButton"));

var _timeUtils = require("../_helpers/time-utils");

var _WithUtils = _interopRequireDefault(require("../_shared/WithUtils"));

var _TimePickerView = _interopRequireDefault(require("./components/TimePickerView"));

var clockType = _interopRequireWildcard(require("../constants/clock-types"));

var TimePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TimePicker, _Component);

  function TimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      openView: clockType.HOURS,
      meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am'
    };

    _this.setMeridiemMode = function (mode) {
      return function () {
        _this.setState({
          meridiemMode: mode
        }, function () {
          return _this.handleChange({
            time: _this.props.date,
            isFinish: false,
            openMinutes: false,
            openSeconds: false
          });
        });
      };
    };

    _this.handleChange = function (_ref) {
      var time = _ref.time,
          isFinish = _ref.isFinish,
          openMinutes = _ref.openMinutes,
          openSeconds = _ref.openSeconds;
      var withMeridiem = (0, _timeUtils.convertToMeridiem)(time, _this.state.meridiemMode, _this.props.ampm, _this.props.utils);

      if (isFinish) {
        if (!openMinutes && !openSeconds) {
          _this.props.onChange(withMeridiem, isFinish);

          return;
        }

        if (openMinutes) {
          _this.openMinutesView();
        }

        if (openSeconds) {
          _this.openSecondsView();
        }
      }

      _this.props.onChange(withMeridiem, false);
    };

    _this.handleHourChange = function (time, isFinish) {
      _this.handleChange({
        time: time,
        isFinish: isFinish,
        openMinutes: true,
        openSeconds: false
      });
    };

    _this.handleMinutesChange = function (time, isFinish) {
      _this.handleChange({
        time: time,
        isFinish: isFinish,
        openMinutes: false,
        openSeconds: _this.props.seconds
      });
    };

    _this.handleSecondsChange = function (time, isFinish) {
      _this.handleChange({
        time: time,
        isFinish: isFinish,
        openMinutes: false,
        openSeconds: false
      });
    };

    _this.openSecondsView = function () {
      _this.setState({
        openView: clockType.SECONDS
      });
    };

    _this.openMinutesView = function () {
      _this.setState({
        openView: clockType.MINUTES
      });
    };

    _this.openHourView = function () {
      _this.setState({
        openView: clockType.HOURS
      });
    };

    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        classes = _this$props.classes,
        theme = _this$props.theme,
        date = _this$props.date,
        utils = _this$props.utils,
        ampm = _this$props.ampm,
        seconds = _this$props.seconds;
    var _this$state = this.state,
        meridiemMode = _this$state.meridiemMode,
        openView = _this$state.openView;
    var rtl = theme.direction === 'rtl';
    var hourMinuteClassName = rtl ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_PickerToolbar.default, {
      className: (0, _classnames2.default)(classes.toolbar, (_classnames = {}, _classnames[classes.toolbarLeftPadding] = ampm, _classnames))
    }, _react.default.createElement("div", {
      className: hourMinuteClassName
    }, _react.default.createElement(_ToolbarButton.default, {
      variant: "display3",
      onClick: this.openHourView,
      selected: openView === clockType.HOURS,
      label: utils.getHourText(date, ampm)
    }), _react.default.createElement(_ToolbarButton.default, {
      variant: "display3",
      label: ":",
      selected: false,
      className: classes.separator
    }), _react.default.createElement(_ToolbarButton.default, {
      variant: "display3",
      onClick: this.openMinutesView,
      selected: openView === clockType.MINUTES,
      label: utils.getMinuteText(date)
    }), seconds && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ToolbarButton.default, {
      variant: "display3",
      label: ":",
      selected: false,
      className: classes.separator
    }), _react.default.createElement(_ToolbarButton.default, {
      variant: "display3",
      onClick: this.openSecondsView,
      selected: openView === clockType.SECONDS,
      label: utils.getSecondText(date)
    }))), ampm && _react.default.createElement("div", {
      className: seconds ? classes.ampmSelectionWithSeconds : classes.ampmSelection
    }, _react.default.createElement(_ToolbarButton.default, {
      className: classes.ampmLabel,
      selected: meridiemMode === 'am',
      variant: "subheading",
      label: utils.getMeridiemText('am'),
      onClick: this.setMeridiemMode('am')
    }), _react.default.createElement(_ToolbarButton.default, {
      className: classes.ampmLabel,
      selected: meridiemMode === 'pm',
      variant: "subheading",
      label: utils.getMeridiemText('pm'),
      onClick: this.setMeridiemMode('pm')
    }))), this.props.children, _react.default.createElement(_TimePickerView.default, {
      date: date,
      type: this.state.openView,
      ampm: ampm,
      onHourChange: this.handleHourChange,
      onMinutesChange: this.handleMinutesChange,
      onSecondsChange: this.handleSecondsChange
    }));
  };

  return TimePicker;
}(_react.Component);

exports.TimePicker = TimePicker;
TimePicker.propTypes = {
  date: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  classes: _propTypes.default.object.isRequired,
  theme: _propTypes.default.object.isRequired,
  children: _propTypes.default.node,
  utils: _propTypes.default.object.isRequired,
  ampm: _propTypes.default.bool,
  seconds: _propTypes.default.bool
};
TimePicker.defaultProps = {
  children: null,
  ampm: true,
  seconds: false
};

var styles = function styles() {
  return {
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    toolbarLeftPadding: {
      paddingLeft: 50
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default'
    },
    ampmSelection: {
      marginLeft: 20,
      marginRight: -20
    },
    ampmSelectionWithSeconds: {
      marginLeft: 15,
      marginRight: 10
    },
    ampmLabel: {
      fontSize: 18
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    hourMinuteLabelReverse: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row-reverse'
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  withTheme: true,
  name: 'MuiPickersTimePicker'
})((0, _WithUtils.default)()(TimePicker));

exports.default = _default;