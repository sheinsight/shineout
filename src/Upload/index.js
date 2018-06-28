import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'

const exports = inputable({ delay: 1 })(Upload)
exports.Image = inputable({ delay: 1 })(Image)

export default exports

