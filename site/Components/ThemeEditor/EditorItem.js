import React from 'react'
import PropTypes from 'prop-types'
import { Form, Slider, Popover } from 'shineout'
import { SketchPicker } from 'react-color'
import cssInject from '../../../src/utils/vars-inject'
import { headerClass } from '../../styles'

function Picker({ value, onChange }) {
  return (
    <span className={headerClass('color')}>
      <div className={headerClass('color-current')} style={{ background: value }} />
      <Popover trigger="click">
        <SketchPicker
          color={value}
          className={headerClass('color-picker')}
          onChange={v => {
            const { rgb } = v
            onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
          }}
        />
      </Popover>
    </span>
  )
}
Picker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

const { Item, Field } = Form

export default props => {
  // eslint-disable-next-line react/prop-types
  const { config, field, open, onChange, header, className } = props
  const getter = config[field]

  if (!getter) return null
  return (
    <div>
      {header}
      {open && (
        <div>
          <Form labelWidth={200} value={getter} onChange={onChange} className={className}>
            {cssInject[field].conf.map(item => {
              const { name, type } = item
              return (
                <Item key={name} label={`${name}: `}>
                  {type === 'color' ? (
                    <Field name={name}>
                      {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={onChangeForm} />}
                    </Field>
                  ) : (
                    <Slider name={name} scale={[item.min || 0, item.max || 50]} />
                  )}
                </Item>
              )
            })}
          </Form>
        </div>
      )}
    </div>
  )
}
