import '../../styles/normalize.less';
import formLess from './form.less';
import genaration from '../../utils/classname';
export var formClass = genaration(formLess, 'form');
export var inputBorderClass = genaration(formLess, 'inputBorder');