import '../../styles/normalize.less'
// rely Alert
import '../../Alert/styles/alert.less'
import messageLess from './message.less'
import genaration from '../../utils/classname'

export const messageClass = genaration(messageLess, 'message')
