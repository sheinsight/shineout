import { darken, fade } from './color'

function getBtnHoverDarken() {
  return (
    getComputedStyle(document.body)
      .getPropertyValue('--btn-hover-darken')
      .trim() || '5%'
  )
}

function setBodyProperty(colors) {
  for (const [cssVar, cssValue] of Object.entries(colors)) {
    document.body.style.setProperty(cssVar, cssValue)
  }
}

const injects = {
  color: {
    set primary(v) {
      setBodyProperty({
        '--primary-color': v,
        '--primary-color-dark-5': darken(v, 5),
        '--primary-color-dark-15': darken(v, 15),
        '--primary-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
        '--primary-color-lighten-40': darken(v, -40),
        '--primary-color-fade-60': fade(v, 0.6),
        '--primary-color-fade-50': fade(v, 0.5),
        '--primary-color-fade-10': fade(v, 0.1),
        '--primary-color-fade-0': fade(v, 0),
        '--primary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--primary-color-dark-5_fade-0': fade(darken(v, 5), 0),
      })
    },
    set warning(v) {
      setBodyProperty({
        '--warning-color': v,
        '--warning-color-dark-5': darken(v, 5),
        '--warning-color-fade-60': fade(v, 0.6),
        '--warning-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--warning-color-fade-0': fade(v, 0),
        '--warning-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--warning-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
      })
    },
    set danger(v) {
      setBodyProperty({
        '--danger-color': v,
        '--danger-color-fade-25': fade(v, 0.25),
        '--danger-color-dark-5': darken(v, 5),
        '--danger-color-fade-60': fade(v, 0.6),
        '--danger-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--danger-color-fade-0': fade(v, 0),
        '--danger-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--danger-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
      })
    },
    set success(v) {
      setBodyProperty({
        '--success-color': v,
        '--success-color-dark-5': darken(v, 5),
        '--success-color-fade-60': fade(v, 0.6),
        '--success-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--success-color-fade-0': fade(v, 0),
        '--success-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--success-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
      })
    },
    set secondary(v) {
      setBodyProperty({
        '--secondary-color': v,
        '--secondary-color-dark-5': darken(v, 5),
        '--secondary-color-dark-btn-hover': darken(v, getBtnHoverDarken()),
        '--secondary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--secondary-color-dark-5_fade-0': fade(darken(v, 5), 0),
      })
    },
  },
  button: {
    set borderRadius(v) {
      setBodyProperty({
        '--button-border-radius': `${parseInt(v, 10)}px`,
      })
    },
    set paddingBaseHorizontal(v) {
      setBodyProperty({
        '--button-padding-base-horizontal': `${parseInt(v, 10)}px`,
        '--button-padding-base-horizontal-7': `${parseInt(v, 10) * 0.7}px`,
      })
    },
    set paddingLargeHorizontal(v) {
      setBodyProperty({
        '--button-padding-large-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingSmallHorizontal(v) {
      setBodyProperty({
        '--button-padding-small-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingBaseVertical(v) {
      setBodyProperty({
        '--button-padding-base-vertical': `${parseInt(v, 10)}px`,
      })
    },
    set paddingLargeVertical(v) {
      setBodyProperty({
        '--button-padding-large-vertical': `${parseInt(v, 10)}px`,
      })
    },
    set paddingSmallVertical(v) {
      setBodyProperty({
        '--button-padding-small-vertical': `${parseInt(v, 10)}px`,
      })
    },
  },
  pagination: {
    set borderRadius(v) {
      setBodyProperty({
        '--pagination-border-radius': `${parseInt(v, 10)}px`,
      })
    },
  },
}

export default injects
