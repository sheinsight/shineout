import React from 'react'
import PropTypes from 'prop-types'
import { Form, Slider } from 'shineout'
import { consumer } from './context'
import config from './config'
import { compose } from '../../../src/utils/func'
import { button } from '../../../src/utils/expose'

const { Item } = Form

function ButtonEditor(props) {
  const { button: buttonGetter = {} } = props.config
  const { open, onChange, header } = props
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={buttonGetter} onChange={onChange}>
            {Object.keys(buttonGetter).map(name => (
              <Item key={name} label={`${name}: `}>
                <Slider name={name} scale={[0, 50]} autoHide />
              </Item>
            ))}
          </Form>
        </div>
      )}
    </div>
  )
}

ButtonEditor.propTypes = {
  config: PropTypes.object,
  open: PropTypes.bool,
  header: PropTypes.element,
  onChange: PropTypes.func,
}

export default compose(
  consumer,
  config('button', button)
)(ButtonEditor)
