const STORAGE_KEY = '17tee190yt8gs'
const storage = window.localStorage || null

let language

if (storage) {
  language = storage.getItem(STORAGE_KEY)
}

if (!language) {
  language = (window.navigator.language || window.navigator.userLanguage || '').toLowerCase()
}

export function setLanguage(lang) {
  language = lang
  if (storage) {
    storage.setItem(STORAGE_KEY, lang)
  }

  window.location.reload()
}

export function getLanguage() {
  return language
}

export default function (cn, en = null) {
  return language === 'zh-cn' ? cn : en
}
