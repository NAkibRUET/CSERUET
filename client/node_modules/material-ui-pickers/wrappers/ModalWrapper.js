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

var _keycode = _interopRequireDefault(require("keycode"));

var _ModalDialog = _interopRequireDefault(require("../_shared/ModalDialog"));

var _DateTextField = _interopRequireDefault(require("../_shared/DateTextField"));

var _propTypes2 = _interopRequireDefault(require("../constants/prop-types"));

var ModalWrapper =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(ModalWrapper, _PureComponent);

  function ModalWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      open: false
    };

    _this.handleKeyDown = function (event) {
      switch ((0, _keycode.default)(event)) {
        case 'enter':
          _this.handleAccept();

          break;

        default:
          // if keycode is not handled, stop execution
          return;
      } // if event was handled prevent other side effects


      event.preventDefault();
    };

    _this.handleSetTodayDate = function () {
      if (_this.props.onSetToday) {
        _this.props.onSetToday();
      }
    };

    _this.open = function () {
      _this.setState({
        open: true
      });

      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    };

    _this.close = function () {
      _this.setState({
        open: false
      });

      if (_this.props.onClose) {
        _this.props.onClose();
      }
    };

    _this.handleAccept = function () {
      _this.close();

      if (_this.props.onAccept) {
        _this.props.onAccept();
      }
    };

    _this.handleDismiss = function () {
      _this.close();

      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    };

    _this.handleClear = function () {
      _this.close();

      if (_this.props.onClear) {
        _this.props.onClear();
      }
    };

    return _this;
  }

  ModalWrapper.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    // only if accept = true close the dialog
    if (nextProps.isAccepted) {
      return {
        open: false
      };
    }

    return null;
  };

  var _proto = ModalWrapper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        format = _this$props.format,
        children = _this$props.children,
        dialogContentClassName = _this$props.dialogContentClassName,
        onAccept = _this$props.onAccept,
        onDismiss = _this$props.onDismiss,
        invalidLabel = _this$props.invalidLabel,
        labelFunc = _this$props.labelFunc,
        okLabel = _this$props.okLabel,
        cancelLabel = _this$props.cancelLabel,
        clearLabel = _this$props.clearLabel,
        clearable = _this$props.clearable,
        todayLabel = _this$props.todayLabel,
        showTodayButton = _this$props.showTodayButton,
        onOpen = _this$props.onOpen,
        onClose = _this$props.onClose,
        onSetToday = _this$props.onSetToday,
        isAccepted = _this$props.isAccepted,
        DialogProps = _this$props.DialogProps,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["value", "format", "children", "dialogContentClassName", "onAccept", "onDismiss", "invalidLabel", "labelFunc", "okLabel", "cancelLabel", "clearLabel", "clearable", "todayLabel", "showTodayButton", "onOpen", "onClose", "onSetToday", "isAccepted", "DialogProps"]);
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DateTextField.default, (0, _extends2.default)({
      value: value,
      format: format,
      onClick: this.open // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
      ,
      invalidLabel: invalidLabel,
      labelFunc: labelFunc,
      clearable: clearable
    }, other)), _react.default.createElement(_ModalDialog.default, (0, _extends2.default)({
      open: this.state.open,
      onKeyDown: this.handleKeyDown,
      onClear: this.handleClear,
      onAccept: this.handleAccept,
      onDismiss: this.handleDismiss,
      onSetToday: this.handleSetTodayDate,
      dialogContentClassName: dialogContentClassName,
      clearLabel: clearLabel,
      todayLabel: todayLabel,
      okLabel: okLabel,
      cancelLabel: cancelLabel,
      clearable: clearable,
      showTodayButton: showTodayButton,
      children: children
    }, DialogProps)));
  };

  return ModalWrapper;
}(_react.PureComponent);

exports.default = ModalWrapper;
ModalWrapper.propTypes = {
  /** "OK" label message */
  okLabel: _propTypes.default.node,

  /** "Cancel" label message */
  cancelLabel: _propTypes.default.node,

  /** "Clear" label message */
  clearLabel: _propTypes.default.node,

  /** If true clear button will be displayed */
  clearable: _propTypes.default.bool,

  /** "Today" label message */
  todayLabel: _propTypes.default.string,

  /**
   * If true today button will be displayed
   * <b>Note*</b> that clear button has higher priority
  */
  showTodayButton: _propTypes.default.bool,

  /** On open callback [(e: Event) => void] */
  onOpen: _propTypes.default.func,

  /** On close callback [(e: Event) => void] */
  format: _propTypes.default.string,

  /** Dialog props passed to material-ui Dialog */
  DialogProps: _propTypes.default.object,
  value: _propTypes2.default.date,
  invalidLabel: _propTypes.default.node,
  labelFunc: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onAccept: _propTypes.default.func,
  onDismiss: _propTypes.default.func,
  onClear: _propTypes.default.func,
  onSetToday: _propTypes.default.func,
  children: _propTypes.default.node.isRequired,
  dialogContentClassName: _propTypes.default.string,
  isAccepted: _propTypes.default.bool.isRequired
};
ModalWrapper.defaultProps = {
  dialogContentClassName: '',
  invalidLabel: undefined,
  value: new Date(),
  labelFunc: undefined,
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  todayLabel: 'Today',
  clearable: false,
  showTodayButton: false,
  format: undefined,
  onAccept: undefined,
  onDismiss: undefined,
  onClear: undefined,
  onOpen: undefined,
  onClose: undefined,
  onSetToday: undefined,
  DialogProps: undefined
};