import React from 'react'
import PropTypes from 'prop-types'
import { Select, utils, Form, Input, Popover } from 'shineout'
import { SketchPicker } from 'react-color'
import { editorClass } from '../../styles'
import locate from '../../locate'

console.log(utils)
const { Field } = Form
const { cssAccessors, cssInject } = utils

function renderItem(attribute) {
  const { name, type, max, min, desc } = attribute
  return (
    <Form.Item label={locate(desc, name)} key={name}>
      {type === 'color' ? (
        <Field name={name}>
          {({ value, onChange: onChangeForm }) => <ColorPicker value={value} onChange={onChangeForm} />}
        </Field>
      ) : type === 'number' ? (
        <Input.Number name={name} min={min || 0} max={max || 50} />
      ) : Array.isArray(type) ? (
        <Select keygen data={type} name={name} />
      ) : (
        <Input name={name} />
      )}
    </Form.Item>
  )
}

function ColorPicker({ value, onChange }) {
  return (
    <div className={editorClass('attr-item')}>
      <Input value={value} width={180} onChange={onChange} />
      <span className={editorClass('color')}>
        <div className={editorClass('color-current')} style={{ background: value }} />
        <Popover trigger="click">
          <SketchPicker
            color={value}
            className={editorClass('color-picker')}
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
ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.modules = Object.keys(cssAccessors).sort((a, b) => a.localeCompare(b))
    this.state = {
      module: this.modules[0],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleModuleChange = this.handleModuleChange.bind(this)
  }

  handleModuleChange(module) {
    this.setState({ module })
  }

  handleChange(value) {
    console.log(value)
    const { module } = this.state
    const setterName = `set${module.replace(/^\S/, s => s.toUpperCase())}`
    if (value[setterName]) value[setterName](value)
  }

  renderModule() {
    return (
      <Select
        className={editorClass('select')}
        keygen
        data={this.modules}
        value={this.state.module}
        onChange={this.handleModuleChange}
      />
    )
  }

  renderItems() {
    const { module } = this.state
    const attributes = cssInject[module].conf
    return (
      <Form labelAlign="top" value={cssAccessors[module]} onChange={this.handleChange}>
        {attributes.map(attribute => renderItem(attribute))}
      </Form>
    )
  }

  render() {
    return (
      <div className={editorClass('_')}>
        <div className={editorClass('header')}>{this.renderModule()}</div>
        <div className={editorClass('body')}>{this.renderItems()}</div>
      </div>
    )
  }
}
