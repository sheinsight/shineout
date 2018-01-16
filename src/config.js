const config = {
  cssModule: false,
  prefix: 'shineout',
}

export default config

export function setConfig(conf) {
  Object.assign(config, conf)
}
