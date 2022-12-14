import { compose } from '../utils/func';
import delay from '../hoc/delay';
import trim from '../hoc/trim';
import inputable from '../Form/inputable';
import inputBorder from '../hoc/inputBorder';
import Component from './Textarea';
import { inputClass } from '../Input/styles';
var input = compose(inputable, inputBorder({
  className: function className(props) {
    var value = props.value,
        renderFooter = props.renderFooter;
    var footer = null;

    if (renderFooter && typeof renderFooter === 'function') {
      footer = renderFooter(value);
    }

    return footer && inputClass('with-footer');
  }
}), delay(400), trim);
var Textarea = input(Component);
Textarea.displayName = 'ShineoutTextarea';
export default Textarea;