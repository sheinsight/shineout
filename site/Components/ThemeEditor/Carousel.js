import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'shineout'
import { consumer } from './context'
import config from './config'
import { compose } from '../../../src/utils/func'
import { carousel } from '../../../src/utils/expose'

const { Item } = Form

function CarouselEditor(props) {
  const { carousel: getter = {} } = props.config
  const { open, header, onChange } = props
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={getter} onChange={onChange}>
            {Object.keys(getter).map(name => (
              <Item key={name} label={`${name}: `}>
                <Input.Number name={name} min={0} digits={0} />
              </Item>
            ))}
          </Form>
        </div>
      )}
    </div>
  )
}

CarouselEditor.propTypes = {
  config: PropTypes.object,
  open: PropTypes.bool,
  header: PropTypes.element,
  onChange: PropTypes.func,
}

export default compose(
  consumer,
  config('carousel', carousel)
)(CarouselEditor)
