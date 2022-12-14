"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Card = _interopRequireDefault(require("./Card"));

var _Submit = _interopRequireDefault(require("./Submit"));

var _context = require("./context");

var _Header = _interopRequireDefault(require("./Header"));

var _Body = _interopRequireDefault(require("./Body"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _Accordion = _interopRequireDefault(require("./Accordion"));

_Card.default.Header = (0, _context.consumer)(_Header.default, ['collapsed', 'onCollapse']);
_Card.default.Body = (0, _context.consumer)(_Body.default, ['collapsed', 'collapsible', 'onCollapse']);
_Card.default.Footer = _Footer.default;
_Card.default.Submit = (0, _context.consumer)(_Submit.default, ['onSubmit', 'formStatus']);
_Card.default.Accordion = _Accordion.default;
_Card.default.Body.displayName = 'ShineoutCardBody';
_Card.default.Header.displayName = 'ShineoutCardHeader';
_Card.default.displayName = 'ShineoutCard';
var _default = _Card.default;
exports.default = _default;