import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'

const exports = inputable(Upload)
exports.Image = inputable(Image)

exports.displayName = 'ShineoutUpload'

export default exports

