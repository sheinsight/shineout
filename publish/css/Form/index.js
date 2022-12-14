"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _Datum = _interopRequireDefault(require("../Datum"));

var _context = require("../Card/context");

var _inputable = _interopRequireDefault(require("./inputable"));

var _Form = _interopRequireDefault(require("./Form"));

var _Item = _interopRequireDefault(require("./Item"));

var _Field = _interopRequireDefault(require("./Field"));

var _BlockField = _interopRequireDefault(require("./BlockField"));

var _Block = _interopRequireDefault(require("./Block"));

var _Loop = _interopRequireDefault(require("./Loop"));

var _Flow = _interopRequireDefault(require("./Flow"));

var _FieldSet = _interopRequireDefault(require("./FieldSet"));

var _formButton = _interopRequireDefault(require("./formButton"));

var _formContext = require("./formContext");

var _mode = _interopRequireDefault(require("./mode"));

var exportForm = (0, _func.compose)(_Datum.default.hoc({
  type: 'form',
  bindProps: ['removeUndefined', 'error']
}), _formContext.formProvider)((0, _context.consumer)(_Form.default, ['setFormStatus']));
exportForm.Item = (0, _formContext.formConsumer)(['formDatum', 'labelWidth', 'labelAlign', 'labelVerticalAlign', 'keepErrorHeight'])(_Item.default);
exportForm.Field = (0, _inputable.default)(_Field.default);
exportForm.Block = (0, _formContext.formConsumer)(['formDatum', 'combineRules'])(_Block.default);
exportForm.BlockField = (0, _inputable.default)(_BlockField.default);
exportForm.Loop = (0, _formContext.formConsumer)(null)(_Loop.default);
exportForm.Flow = (0, _formContext.formConsumer)(['formDatum'])(_Flow.default);
exportForm.FieldSet = (0, _formContext.formConsumer)(['formDatum'])(_FieldSet.default);
exportForm.Submit = (0, _formButton.default)('submit');
exportForm.Reset = (0, _formButton.default)('reset');
exportForm.Button = (0, _formButton.default)('button');
exportForm.formConsumer = _formContext.formConsumer;
exportForm.useMode = _mode.default;
exportForm.displayName = 'ShineoutForm';
exportForm.Item.displayName = 'ShineoutFormItem';
exportForm.Field.displayName = 'ShineoutFormField';
exportForm.Block.displayName = 'ShineoutFormBlock';
exportForm.BlockField.displayName = 'ShineoutFormBlockField';
exportForm.Loop.displayName = 'ShineoutFormLoop';
exportForm.Flow.displayName = 'ShineoutFormFlow';
exportForm.FieldSet.displayName = 'ShineoutFormFieldSet';
var _default = exportForm;
exports.default = _default;