import { compose } from '../utils/func';
import delay from '../hoc/delay';
import trim from '../hoc/trim';
import inputable from '../Form/inputable';
import Component from './EditableArea';
var EditableArea = compose(inputable, delay(400), trim)(Component);
EditableArea.displayName = 'ShineoutEditableArea';
export default EditableArea;