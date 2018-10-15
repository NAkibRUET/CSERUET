"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Clock = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _ClockPointer = _interopRequireDefault(require("./ClockPointer"));

var clockType = _interopRequireWildcard(require("../../constants/clock-types"));

var _timeUtils = require("../../_helpers/time-utils");

var Clock =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Clock, _Component);

  function Clock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleTouchMove = function (e) {
      _this.isMoving = true;

      _this.setTime(e);
    };

    _this.handleTouchEnd = function (e) {
      if (_this.isMoving) {
        _this.setTime(e, true);

        _this.isMoving = false;
      }
    };

    _this.handleMove = function (e) {
      e.preventDefault();
      e.stopPropagation(); // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari

      var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

      if (isButtonPressed) {
        _this.setTime(e.nativeEvent, false);
      }
    };

    _this.handleMouseUp = function (e) {
      if (_this.isMoving) {
        _this.isMoving = false;
      }

      _this.setTime(e.nativeEvent, true);
    };

    _this.hasSelected = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          value = _this$props.value;

      if (type === clockType.HOURS) {
        return true;
      }

      return value % 5 === 0;
    };

    return _this;
  }

  var _proto = Clock.prototype;

  _proto.setTime = function setTime(e, isFinish) {
    if (isFinish === void 0) {
      isFinish = false;
    }

    var offsetX = e.offsetX,
        offsetY = e.offsetY;

    if (typeof offsetX === 'undefined') {
      var rect = e.target.getBoundingClientRect();
      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    var value = this.props.type === clockType.SECONDS || this.props.type === clockType.MINUTES ? (0, _timeUtils.getMinutes)(offsetX, offsetY) : (0, _timeUtils.getHours)(offsetX, offsetY, this.props.ampm);
    this.props.onChange(value, isFinish);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        classes = _this$props2.classes,
        value = _this$props2.value,
        children = _this$props2.children,
        type = _this$props2.type,
        ampm = _this$props2.ampm;
    var isPointerInner = !ampm && type === clockType.HOURS && (value < 1 || value > 12);
    return _react.default.createElement("div", {
      className: classes.container
    }, _react.default.createElement("div", {
      className: classes.clock
    }, _react.default.createElement("div", {
      role: "menu",
      tabIndex: -1,
      className: classes.squareMask,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onMouseUp: this.handleMouseUp,
      onMouseMove: this.handleMove
    }), _react.default.createElement("div", {
      className: classes.pin
    }), _react.default.createElement(_ClockPointer.default, {
      type: type,
      value: value,
      isInner: isPointerInner,
      hasSelected: this.hasSelected()
    }), children));
  };

  return Clock;
}(_react.Component);

exports.Clock = Clock;
Clock.propTypes = {
  type: _propTypes.default.oneOf(Object.keys(clockType).map(function (key) {
    return clockType[key];
  })).isRequired,
  classes: _propTypes.default.object.isRequired,
  value: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func.isRequired,
  children: _propTypes.default.arrayOf(_propTypes.default.node).isRequired,
  ampm: _propTypes.default.bool
};
Clock.defaultProps = {
  ampm: false
};

var styles = function styles(theme) {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: [[theme.spacing.unit * 4, 0, theme.spacing.unit]]
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none',
      zIndex: 1
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move'
      }
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersClock'
})(Clock);

exports.default = _default;