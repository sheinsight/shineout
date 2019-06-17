import React from 'react'
import PropTypes from 'prop-types'
import { Form, Slider } from 'shineout'
import { consumer } from './context'
import config from './config'
import { compose } from '../../../src/utils/func'
import { tag } from '../../../src/utils/expose'
import { Picker } from './Color'

const { Field, Item } = Form
function TagEditor(props) {
  const { tag: getter = {} } = props.config
  const { open, onChange, header } = props
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={getter} onChange={onChange}>
            <Item label="background: ">
              <Field name="bg">
                {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={v => onChangeForm(v.hex)} />}
              </Field>
            </Item>
            <Item label="borderColor: ">
              <Field name="borderColor">
                {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={v => onChangeForm(v.hex)} />}
              </Field>
            </Item>
            <Item label="borderRadius: ">
              <Slider name="borderRadius" scale={[0, 50]} autoHide />
            </Item>
            <Item label="paddingHorizontal: ">
              <Slider name="paddingHorizontal" scale={[0, 50]} autoHide />
            </Item>
            <Item label="paddingVertical: ">
              <Slider name="paddingVertical" scale={[0, 50]} autoHide />
            </Item>
          </Form>
        </div>
      )}
    </div>
  )
}

TagEditor.propTypes = {
  config: PropTypes.object,
  open: PropTypes.bool,
  header: PropTypes.element,
  onChange: PropTypes.func,
}

export default compose(
  consumer,
  config('tag', tag)
)(TagEditor)
