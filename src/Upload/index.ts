import inputable from '../Form/inputable'
import Upload from './Upload'
import Image, { Handler } from './Image'
import Progress from './Progress'
import Dragger from './Dragger'
import { consumer } from './context'
import { UploadType } from './Props'

const exports: any = inputable(Upload)
exports.Image = inputable(Image)
exports.ImageHandler = Handler
exports.Button = inputable(Progress)
exports.Dragger = consumer(Dragger)

exports.displayName = 'ShineoutUpload'

exports.Image.displayName = 'ShineoutImageUpload'
exports.Button.displayName = 'ShineoutButtonUpload'
exports.Dragger.displayName = 'ShineoutDraggerUpload'

export default exports as UploadType
