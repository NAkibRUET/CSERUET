"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var Day =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Day, _PureComponent);

  function Day() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Day.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        children = _this$props.children,
        classes = _this$props.classes,
        disabled = _this$props.disabled,
        hidden = _this$props.hidden,
        current = _this$props.current,
        selected = _this$props.selected,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "classes", "disabled", "hidden", "current", "selected"]);
    var className = (0, _classnames2.default)(classes.day, (_classnames = {}, _classnames[classes.hidden] = hidden, _classnames[classes.current] = current, _classnames[classes.selected] = selected, _classnames[classes.disabled] = disabled, _classnames));
    return _react.default.createElement(_IconButton.default, (0, _extends2.default)({
      className: className,
      tabIndex: hidden || disabled ? -1 : 0
    }, other), children);
  };

  return Day;
}(_react.PureComponent);

Day.propTypes = {
  children: _propTypes.default.node.isRequired,
  classes: _propTypes.default.object.isRequired,
  current: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  hidden: _propTypes.default.bool,
  selected: _propTypes.default.bool
};
Day.defaultProps = {
  disabled: false,
  hidden: false,
  current: false,
  selected: false
};

var styles = function styles(theme) {
  return {
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none'
    },
    current: {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    selected: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersDay'
})(Day);

exports.default = _default;