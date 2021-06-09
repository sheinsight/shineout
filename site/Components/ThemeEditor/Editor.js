import React from 'react'
import PropTypes from 'prop-types'
import { Select, utils, Form, Input, Popover, style } from 'shineout'
import { SketchPicker } from 'react-color'
import { editorClass } from '../../styles'
import locate from '../../locate'
import { consumer } from './context'

const { Field } = Form
const { cssAccessors, cssInject } = utils

function handleDownload() {
  const template = `import { style } from 'shineout';\nconst config = ${JSON.stringify(
    cssAccessors,
    null,
    2
  )};\nstyle.setStyle(config)
  `
  const a = document.createElement('a')
  a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(template)}`)
  a.setAttribute('download', 'shineout.theme.js')
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

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

class Editor extends React.Component {
  static propTypes = {
    bindReset: PropTypes.func,
    bindDownload: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.modules = Object.keys(cssAccessors).sort((a, b) => a.localeCompare(b))
    this.state = {
      module: 'color',
    }

    this.formKey = Date.now()
    this.defaultTheme = JSON.parse(JSON.stringify(cssAccessors))
    props.bindReset(this.handleReset.bind(this))
    props.bindDownload(handleDownload)

    this.handleList = this.handleList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleModuleChange = this.handleModuleChange.bind(this)
  }

  handleModuleChange(module) {
    this.formKey += 1
    if (this.list) this.list.scrollTop = 0
    this.setState({ module })
  }

  handleChange(value) {
    const { module } = this.state
    const setterName = `set${module.replace(/^\S/, s => s.toUpperCase())}`
    if (value[setterName]) value[setterName](value)
  }

  handleList(list) {
    this.list = list
  }

  handleReset() {
    style.setStyle(this.defaultTheme)
    this.forceUpdate()
    this.formKey += 1
  }

  renderModule() {
    return (
      <Select
        onFilter={text => c => c.indexOf(text.toLowerCase()) >= 0}
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
      <Form key={this.formKey} labelAlign="top" value={cssAccessors[module]} onChange={this.handleChange}>
        {attributes.map(attribute => renderItem(attribute))}
      </Form>
    )
  }

  render() {
    return (
      <div className={editorClass('_')}>
        <div className={editorClass('header')}>{this.renderModule()}</div>
        <div className={editorClass('body')} ref={this.handleList}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default consumer(Editor)
