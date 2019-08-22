import React from 'react'
import PropTypes from 'prop-types'
import { Form, Popover, Input } from 'shineout'
import { SketchPicker } from 'react-color'
import cssInject from '../../../src/utils/vars-inject'
import { headerClass } from '../../styles'

function Picker({ value, onChange }) {
  return (
    <div className={headerClass('attr-item')}>
      <Input value={value} width={180} onBlur={onChange} />
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
    </div>
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
      <div style={{ display: open ? 'block' : 'none' }}>
        <Form value={getter} onChange={onChange} className={className}>
          {cssInject[field].conf.map(item => {
            const { name, type, desc } = item
            return (
              <div key={name}>
                <Item label={name} className={headerClass('form-color')}>
                  {type === 'color' ? (
                    <Field name={name}>
                      {({ value, onChange: onChangeForm }) => <Picker value={value} onChange={onChangeForm} />}
                    </Field>
                  ) : type === 'number' ? (
                    <Input.Number name={name} min={item.min || 0} max={item.max || 50} />
                  ) : (
                    <Input name={name} />
                  )}
                </Item>
                {desc && <span className={headerClass('form-desc')}>{desc}</span>}
              </div>
            )
          })}
        </Form>
      </div>
    </div>
  )
}
