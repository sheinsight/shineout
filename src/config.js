const config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locate: process.env.LOCATE || 'en-US',
}

export default config

export function setConfig(conf) {
  Object.assign(config, conf)
}
