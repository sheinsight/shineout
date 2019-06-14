import React from 'react'
import PropTypes from 'prop-types'
import { Form, Slider } from 'shineout'
import { consumer } from './context'
import { Picker } from './Color'
import config from './config'
import { compose } from '../../../src/utils/func'
import { table } from '../../../src/utils/expose'

const { Item, Field } = Form

function TableEditor(props) {
  const { table: getter = {} } = props.config
  const { open, header, onChange } = props
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={getter} onChange={onChange}>
            <Item label="headBg: ">
              <Field name="headBg">
                {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={v => onChangeForm(v.hex)} />}
              </Field>
            </Item>
            <Item label="headColor: ">
              <Field name="headColor">
                {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={v => onChangeForm(v.hex)} />}
              </Field>
            </Item>
            <Item label="borderRadiusTop: ">
              <Slider name="borderRadiusTop" scale={[0, 50]} autoHide />
            </Item>
          </Form>
        </div>
      )}
    </div>
  )
}

TableEditor.propTypes = {
  config: PropTypes.object,
  open: PropTypes.bool,
  header: PropTypes.element,
  onChange: PropTypes.func,
}

export default compose(
  consumer,
  config('table', table)
)(TableEditor)
