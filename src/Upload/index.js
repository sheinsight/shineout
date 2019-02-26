import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'
import Progress from './Progress'

const exports = inputable(Upload)
exports.Image = inputable(Image)
exports.Button = inputable(Progress)

exports.displayName = 'ShineoutUpload'

exports.Image.displayName = 'ShineoutImageUpload'

export default exports
