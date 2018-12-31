"use strict";

exports.__esModule = true;
exports.getPropType = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _capitalize = _interopRequireDefault(require("capitalize"));

var _humanizeProp = require("./humanize-prop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

//https://github.com/pedronauck/docz/blob/master/packages/docz/src/components/PropsTable.tsx
var getPropType = function getPropType(prop, Tooltip) {
  var propName = prop.flowType ? prop.flowType.name : prop.type.name;
  var isEnum = propName.startsWith('"') || propName === 'enum';
  var name = (0, _capitalize.default)(isEnum ? 'enum' : propName);
  var value = prop.type && prop.type.value;
  if (!name) return null;

  if (!Tooltip || isEnum && typeof value === 'string' || !prop.flowType && !isEnum && !value || prop.flowType && !prop.flowType.elements) {
    return name;
  }

  return prop.flowType ? _react.default.createElement(Tooltip, {
    text: (0, _humanizeProp.humanize)(prop.flowType)
  }, name) : _react.default.createElement(Tooltip, {
    text: (0, _humanizeProp.humanize)(prop.type)
  }, name);
};

exports.getPropType = getPropType;

var ReactPropsTable =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ReactPropsTable, _React$Component);

  function ReactPropsTable() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ReactPropsTable.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$of = _this$props.of,
        component = _this$props$of === void 0 ? {} : _this$props$of,
        _this$props$component = _this$props.components,
        components = _this$props$component === void 0 ? {} : _this$props$component,
        className = _this$props.className;
    var info = component.__docgenInfo;
    var props = info && info.props;
    var hasDescription = Object.keys(props).some(function (name) {
      var description = (0, _lodash.default)(props, name + ".description");
      return Boolean(description) && Boolean((0, _lodash.default)(description, 'length'));
    });
    var Table = components.table || 'table';
    var Thead = components.thead || 'thead';
    var Tr = components.tr || 'tr';
    var Th = components.th || 'th';
    var Tbody = components.tbody || 'tbody';
    var Td = components.td || 'td';
    var Tooltip = components.tooltip;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(Table, {
      className: className + " PropsTable"
    }, _react.default.createElement(Thead, null, _react.default.createElement(Tr, null, _react.default.createElement(Th, {
      className: "PropsTable--property"
    }, "Property"), _react.default.createElement(Th, {
      className: "PropsTable--type"
    }, "Type"), _react.default.createElement(Th, {
      className: "PropsTable--required"
    }, "Required"), _react.default.createElement(Th, {
      className: "PropsTable--default"
    }, "Default"), hasDescription && _react.default.createElement(Th, {
      width: "40%",
      className: "PropsTable--description"
    }, "Description"))), _react.default.createElement(Tbody, null, props && Object.keys(props).map(function (name) {
      var prop = props[name];
      if (!prop.flowType && !prop.type) return null;
      return _react.default.createElement(Tr, {
        key: name
      }, _react.default.createElement(Td, null, name), _react.default.createElement(Td, null, getPropType(prop, Tooltip)), _react.default.createElement(Td, null, String(prop.required)), !prop.defaultValue ? _react.default.createElement(Td, null, _react.default.createElement("em", null, "-")) : _react.default.createElement(Td, null, prop.defaultValue.value === "''" ? _react.default.createElement("em", null, "[Empty String]") : prop.defaultValue && prop.defaultValue.value.replace(/\'/g, '')), hasDescription && _react.default.createElement(Td, null, prop.description && prop.description));
    }))));
  };

  return ReactPropsTable;
}(_react.default.Component);

ReactPropsTable.__esModule = true;
ReactPropsTable.default = ReactPropsTable;
module.exports = ReactPropsTable;