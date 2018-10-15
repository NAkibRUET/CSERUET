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

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var ToolbarButton = function ToolbarButton(props) {
  var _classnames;

  var classes = props.classes,
      selected = props.selected,
      label = props.label,
      className = props.className,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "selected", "label", "className"]);
  return _react.default.createElement(_Typography.default, (0, _extends2.default)({
    className: (0, _classnames2.default)(classes.toolbarBtn, className, (_classnames = {}, _classnames[classes.toolbarBtnSelected] = selected, _classnames))
  }, other), label);
};

ToolbarButton.propTypes = {
  selected: _propTypes.default.bool.isRequired,
  label: _propTypes.default.string.isRequired,
  classes: _propTypes.default.object.isRequired,
  className: _propTypes.default.string
};
ToolbarButton.defaultProps = {
  className: ''
};

var styles = function styles(theme) {
  return {
    toolbarBtn: {
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.54)'
    },
    toolbarBtnSelected: {
      color: theme.palette.common.white
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersToolbarButton'
})(ToolbarButton);

exports.default = _default;