type AcceptedFiles = string | string[]

export default function attrAccept(file?: File, acceptedFiles?: AcceptedFiles) {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',')
    const fileName = file.name || ''
    const mimeType = file.type || ''
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptedFilesArray.some(type => {
      const validType = type.trim()
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType.toLowerCase())
      }
      if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }
      return mimeType === validType
    })
  }
  return true
}
