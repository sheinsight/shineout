import '../../styles/normalize.less';
import lazyloadLess from './lazyload.less';
import genaration from '../../utils/classname';
export var lazyloadClass = genaration(lazyloadLess, 'lazyload');