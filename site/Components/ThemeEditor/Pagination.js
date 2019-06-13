import React from 'react'
import PropTypes from 'prop-types'
import { Slider, Form } from 'shineout'
import { consumer } from './context'
import config from './config'
import { compose } from '../../../src/utils/func'
import { pagination } from '../../../src/utils/expose'

const { Item } = Form

function PaginationEditor(props) {
  const { pagination: getter = {} } = props.config
  const { open, header, onChange } = props
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={getter} onChange={onChange}>
            {Object.keys(getter).map(name => (
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

PaginationEditor.propTypes = {
  config: PropTypes.object,
  open: PropTypes.bool,
  header: PropTypes.element,
  onChange: PropTypes.func,
}

export default compose(
  consumer,
  config('pagination', pagination)
)(PaginationEditor)
