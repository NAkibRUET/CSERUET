"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClockPointer = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var clockType = _interopRequireWildcard(require("../../constants/clock-types"));

var ClockPointer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ClockPointer, _Component);

  function ClockPointer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      toAnimateTransform: false,
      previousType: undefined // eslint-disable-line

    };

    _this.getAngleStyle = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          isInner = _this$props.isInner,
          type = _this$props.type;
      var max = type === clockType.HOURS ? 12 : 60;
      var angle = 360 / max * value;

      if (type === clockType.HOURS && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: "rotateZ(" + angle + "deg)"
      };
    };

    return _this;
  }

  var _proto = ClockPointer.prototype;

  _proto.render = function render() {
    var _classnames, _classnames2;

    var _this$props2 = this.props,
        classes = _this$props2.classes,
        hasSelected = _this$props2.hasSelected;
    return _react.default.createElement("div", {
      style: this.getAngleStyle(),
      className: (0, _classnames3.default)(classes.pointer, (_classnames = {}, _classnames[classes.animateTransform] = this.state.toAnimateTransform, _classnames))
    }, _react.default.createElement("div", {
      className: (0, _classnames3.default)(classes.thumb, (_classnames2 = {}, _classnames2[classes.noPoint] = hasSelected, _classnames2))
    }));
  };

  return ClockPointer;
}(_react.Component);

exports.ClockPointer = ClockPointer;
ClockPointer.propTypes = {
  classes: _propTypes.default.object.isRequired,
  value: _propTypes.default.number.isRequired,
  hasSelected: _propTypes.default.bool.isRequired,
  isInner: _propTypes.default.bool.isRequired,
  type: _propTypes.default.oneOf(Object.keys(clockType).map(function (key) {
    return clockType[key];
  })).isRequired
};

ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
  if (nextProps.type !== state.previousType) {
    return {
      toAnimateTransform: true,
      previousType: nextProps.type
    };
  }

  return {
    toAnimateTransform: false,
    previousType: nextProps.type
  };
};

var styles = function styles(theme) {
  return {
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.common.white,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: "14px solid " + theme.palette.primary.main,
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersClockPointer'
})(ClockPointer);

exports.default = _default;