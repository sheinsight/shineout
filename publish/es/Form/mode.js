import { formConsumer } from './formContext';
import { memoize } from '../utils/func';
var createMode = memoize(function (mode) {
  return formConsumer(['formMode'], function (props) {
    var isMatch = mode === props.formMode;
    if (props.reverse) isMatch = !isMatch;
    return isMatch ? props.children : true;
  });
});
export default (function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.map(createMode);
});