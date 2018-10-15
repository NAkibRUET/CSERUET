"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DateTimePickerView = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var DateTimePickerView = function DateTimePickerView(_ref) {
  var selected = _ref.selected,
      children = _ref.children,
      classes = _ref.classes;

  if (!selected) {
    return null;
  }

  return _react.default.createElement("div", {
    className: classes.view
  }, children);
};

exports.DateTimePickerView = DateTimePickerView;
DateTimePickerView.propTypes = {
  selected: _propTypes.default.bool.isRequired,
  children: _propTypes.default.node.isRequired,
  classes: _propTypes.default.object.isRequired
};
var styles = {
  view: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0
  }
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPickerDTPickerView '
})(DateTimePickerView);

exports.default = _default;