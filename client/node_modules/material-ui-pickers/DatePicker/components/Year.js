"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Year = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var Year =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Year, _PureComponent);

  function Year() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    };

    return _this;
  }

  var _proto = Year.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        classes = _this$props.classes,
        selected = _this$props.selected,
        disabled = _this$props.disabled,
        value = _this$props.value,
        children = _this$props.children,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classes", "selected", "disabled", "value", "children"]);
    return _react.default.createElement(_Typography.default, (0, _extends2.default)({
      role: "button",
      component: "div",
      className: (0, _classnames2.default)(classes.root, (_classnames = {}, _classnames[classes.selected] = selected, _classnames[classes.disabled] = disabled, _classnames)),
      tabIndex: disabled ? -1 : 0,
      onClick: this.handleClick,
      onKeyPress: this.handleClick,
      color: selected ? 'primary' : 'default',
      variant: selected ? 'headline' : 'subheading'
    }, other), children);
  };

  return Year;
}(_react.PureComponent);

exports.Year = Year;
Year.propTypes = {
  children: _propTypes.default.node.isRequired,
  classes: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func.isRequired,
  selected: _propTypes.default.bool,
  value: _propTypes.default.any.isRequired
};
Year.defaultProps = {
  selected: false,
  disabled: false
};

var styles = function styles(theme) {
  return {
    root: {
      height: theme.spacing.unit * 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    selected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersYear'
})(Year);

exports.default = _default;