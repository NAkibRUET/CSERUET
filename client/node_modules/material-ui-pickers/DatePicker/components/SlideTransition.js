"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _TransitionGroup = _interopRequireDefault(require("react-transition-group/TransitionGroup"));

var _CSSTransition = _interopRequireDefault(require("react-transition-group/CSSTransition"));

var animationDuration = 350;

var transitionFactory = function transitionFactory(props) {
  return function (child) {
    return _react.default.cloneElement(child, props);
  };
};

var SlideTransition = function SlideTransition(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      children = _ref.children,
      transKey = _ref.transKey,
      slideDirection = _ref.slideDirection;
  return _react.default.createElement(_TransitionGroup.default, {
    className: (0, _classnames.default)(classes.transitionContainer, className),
    childFactory: transitionFactory({
      classNames: {
        enter: classes["slideEnter-" + slideDirection],
        enterActive: classes.slideEnterActive,
        exit: classes.slideExit,
        exitActive: classes["slideExitActiveLeft-" + slideDirection]
      }
    })
  }, _react.default.createElement(_CSSTransition.default, {
    key: transKey,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: animationDuration
  }, children));
};

SlideTransition.propTypes = {
  classes: _propTypes.default.shape({}).isRequired,
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  slideDirection: _propTypes.default.oneOf(['left', 'right']).isRequired,
  transKey: _propTypes.default.string.isRequired
};
SlideTransition.defaultProps = {
  className: undefined
};

var styles = function styles(theme) {
  var slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return {
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
      }
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)'
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)'
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    slideExit: {
      transform: 'translate(0%)'
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition
    }
  };
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersSlideTransition'
})(SlideTransition);

exports.default = _default;