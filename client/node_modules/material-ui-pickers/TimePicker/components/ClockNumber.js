"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClockNumber = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50]
};

var ClockNumber =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ClockNumber, _Component);

  function ClockNumber() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.getTransformStyle = function (index) {
      var position = positions[index];
      return {
        transform: "translate(" + position[0] + "px, " + position[1] + "px"
      };
    };

    return _this;
  }

  var _proto = ClockNumber.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        selected = _this$props.selected,
        label = _this$props.label,
        index = _this$props.index,
        classes = _this$props.classes,
        isInner = _this$props.isInner;
    var className = (0, _classnames2.default)(classes.clockNumber, (_classnames = {}, _classnames[classes.selected] = selected, _classnames));
    return _react.default.createElement(_Typography.default, {
      variant: isInner ? 'body1' : 'subheading',
      component: "span",
      className: className,
      style: this.getTransformStyle(index, isInner)
    }, label);
  };

  return ClockNumber;
}(_react.Component);

exports.ClockNumber = ClockNumber;
ClockNumber.propTypes = {
  index: _propTypes.default.number.isRequired,
  label: _propTypes.default.string.isRequired,
  selected: _propTypes.default.bool.isRequired,
  classes: _propTypes.default.object.isRequired,
  isInner: _propTypes.default.bool
};
ClockNumber.defaultProps = {
  isInner: false
};

var styles = function styles(theme) {
  var size = theme.spacing.unit * 4;
  return {
    clockNumber: {
      width: size,
      height: size,
      userSelect: 'none',
      position: 'absolute',
      left: "calc(50% - " + size / 2 + "px)",
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint
    },
    selected: {
      color: theme.palette.common.white
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersClockNumber'
})(ClockNumber);

exports.default = _default;