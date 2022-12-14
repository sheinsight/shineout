import '../../styles/normalize.less';
import resizableLess from './resizable.less';
import moveableLess from './moveable.less';
import hidableLess from './hidable.less';
import genaration from '../../utils/classname';
export var hidableClass = genaration(hidableLess, 'hidable');
export var moveableClass = genaration(moveableLess, 'moveable');
export var resizableClass = genaration(resizableLess, 'resizable');