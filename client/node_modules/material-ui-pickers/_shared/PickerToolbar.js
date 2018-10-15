"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var PickerToolbar = function PickerToolbar(props) {
  var children = props.children,
      className = props.className,
      classes = props.classes,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "classes"]);
  return _react.default.createElement(_Toolbar.default, (0, _extends2.default)({
    className: (0, _classnames.default)(classes.toolbar, className)
  }, other), children);
};

PickerToolbar.propTypes = {
  children: _propTypes.default.arrayOf(_propTypes.default.node).isRequired,
  className: _propTypes.default.string,
  classes: _propTypes.default.object.isRequired
};
PickerToolbar.defaultProps = {
  className: ''
};

var styles = function styles(theme) {
  return {
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background.default
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersToolbar'
})(PickerToolbar);

exports.default = _default;