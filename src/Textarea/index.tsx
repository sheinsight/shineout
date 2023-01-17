import { ComponentType } from 'react'
import { compose } from '../utils/func'
import delay from '../hoc/delay'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import Component from './Textarea'
import { inputClass } from '../Input/styles'
import { TextareaProps, TextareaPropsWithDelay } from './props'

const input = compose(
  inputable,
  inputBorder({
    className: (props: TextareaPropsWithDelay) => {
      const { value, renderFooter } = props
      let footer = null
      if (renderFooter && typeof renderFooter === 'function') {
        footer = renderFooter(value)
      }
      return footer && inputClass('with-footer')
    },
  }),
  delay(400)
)

const Textarea = input(Component)

Textarea.displayName = 'ShineoutTextarea'

export default Textarea as ComponentType<TextareaProps>
