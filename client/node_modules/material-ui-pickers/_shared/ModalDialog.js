"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModalDialog = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var dialogWidth = 310;
var dialogHeight = 405;
var styles = {
  dialogRoot: {
    minWidth: dialogWidth,
    minHeight: dialogHeight
  },
  dialog: {
    width: dialogWidth,
    minHeight: dialogHeight,
    overflow: 'hidden',
    '&:first-child': {
      padding: 0
    }
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start'
  },
  clearableDialogAction: {
    '&:first-child': {
      marginRight: 'auto'
    }
  },
  todayDialogAction: {
    '&:first-child': {
      marginRight: 'auto'
    }
  },
  dialogAction: {// empty but may be needed for override
  }
};

var ModalDialog = function ModalDialog(_ref) {
  var _classnames;

  var children = _ref.children,
      classes = _ref.classes,
      onKeyDown = _ref.onKeyDown,
      onAccept = _ref.onAccept,
      onDismiss = _ref.onDismiss,
      onClear = _ref.onClear,
      onSetToday = _ref.onSetToday,
      okLabel = _ref.okLabel,
      cancelLabel = _ref.cancelLabel,
      clearLabel = _ref.clearLabel,
      todayLabel = _ref.todayLabel,
      dialogContentClassName = _ref.dialogContentClassName,
      clearable = _ref.clearable,
      showTodayButton = _ref.showTodayButton,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["children", "classes", "onKeyDown", "onAccept", "onDismiss", "onClear", "onSetToday", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "dialogContentClassName", "clearable", "showTodayButton"]);
  return _react.default.createElement(_Dialog.default, (0, _extends2.default)({
    onClose: onDismiss,
    classes: {
      paper: classes.dialogRoot
    }
  }, other), _react.default.createElement(_reactEventListener.default, {
    target: "window",
    onKeyDown: onKeyDown
  }), _react.default.createElement(_DialogContent.default, {
    className: (0, _classnames2.default)(classes.dialog, dialogContentClassName)
  }, children), _react.default.createElement(_DialogActions.default, {
    classes: {
      root: clearable && classes.dialogActions,
      action: (0, _classnames2.default)(classes.dialogAction, (_classnames = {}, _classnames[classes.clearableDialogAction] = clearable, _classnames[classes.todayDialogAction] = !clearable && showTodayButton, _classnames))
    }
  }, clearable && _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: onClear,
    "aria-label": clearLabel
  }, clearLabel), !clearable && showTodayButton && _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: onSetToday,
    "aria-label": todayLabel
  }, todayLabel), _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: onDismiss,
    "aria-label": cancelLabel
  }, cancelLabel), _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: onAccept,
    "aria-label": okLabel
  }, okLabel)));
};

exports.ModalDialog = ModalDialog;
ModalDialog.propTypes = {
  children: _propTypes.default.node.isRequired,
  onKeyDown: _propTypes.default.func.isRequired,
  onAccept: _propTypes.default.func.isRequired,
  onDismiss: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func.isRequired,
  classes: _propTypes.default.object.isRequired,
  dialogContentClassName: _propTypes.default.string,
  okLabel: _propTypes.default.node.isRequired,
  cancelLabel: _propTypes.default.node.isRequired,
  clearLabel: _propTypes.default.node.isRequired,
  clearable: _propTypes.default.bool.isRequired,
  todayLabel: _propTypes.default.node.isRequired,
  showTodayButton: _propTypes.default.bool.isRequired,
  onSetToday: _propTypes.default.func.isRequired
};
ModalDialog.defaultProps = {
  dialogContentClassName: ''
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickersModal'
})(ModalDialog);

exports.default = _default;