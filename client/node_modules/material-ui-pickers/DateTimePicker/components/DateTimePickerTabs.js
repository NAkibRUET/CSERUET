"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DateTimePickerTabs = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _withTheme = _interopRequireDefault(require("@material-ui/core/styles/withTheme"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var viewType = _interopRequireWildcard(require("../../constants/date-picker-view"));

var viewToTabIndex = function viewToTabIndex(openView) {
  if (openView === viewType.DATE || openView === viewType.YEAR) {
    return 'date';
  }

  return 'time';
};

var tabIndexToView = function tabIndexToView(tab) {
  if (tab === 'date') {
    return viewType.DATE;
  }

  return viewType.HOUR;
};

var DateTimePickerTabs = function DateTimePickerTabs(props) {
  var view = props.view,
      onChange = props.onChange,
      classes = props.classes,
      theme = props.theme,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon;
  var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';

  var handleChange = function handleChange(e, value) {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return _react.default.createElement(_Paper.default, null, _react.default.createElement(_Tabs.default, {
    fullWidth: true,
    value: viewToTabIndex(view),
    onChange: handleChange,
    className: classes.tabs,
    indicatorColor: indicatorColor
  }, _react.default.createElement(_Tab.default, {
    value: "date",
    icon: _react.default.createElement(_Icon.default, null, dateRangeIcon)
  }), _react.default.createElement(_Tab.default, {
    value: "time",
    icon: _react.default.createElement(_Icon.default, null, timeIcon)
  })));
};

exports.DateTimePickerTabs = DateTimePickerTabs;
DateTimePickerTabs.propTypes = {
  view: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  classes: _propTypes.default.object.isRequired,
  theme: _propTypes.default.object.isRequired,
  dateRangeIcon: _propTypes.default.node.isRequired,
  timeIcon: _propTypes.default.node.isRequired
};

var styles = function styles(theme) {
  return {
    tabs: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background.default
    }
  };
};

var _default = (0, _withTheme.default)()((0, _withStyles.default)(styles, {
  name: 'MuiPickerDTTabs'
})(DateTimePickerTabs));

exports.default = _default;