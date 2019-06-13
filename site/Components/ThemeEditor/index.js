import React from 'react'
import { Button, Modal } from 'shineout'
import immer from 'immer'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import history from '../../history'
import { headerClass } from '../../styles'
import ColorPicker from './Color'
import PaginationEditor from './Pagination'
import ButtonEditor from './Button'
import TableEditor from './Table'
import CarouselEditor from './Carousel'
import { context, Provider } from './context'

function Foot() {
  const ctx = React.useContext(context)
  return (
    <div className={headerClass('editor-footer')}>
      <Button onClick={ctx.resetConfig}>恢复</Button>
      <Button type="primary" onClick={ctx.genConfig}>
        导出配置
      </Button>
    </div>
  )
}

function Head({ active, title }) {
  return (
    <h2 className={classnames('picker-title', active && headerClass('active'))}>
      <span />
      {title}
    </h2>
  )
}
Head.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.editors = [
      {
        title: 'Color 颜色',
        component: ColorPicker,
      },
      {
        title: 'Button 按钮',
        component: ButtonEditor,
        path: 'Button',
      },
      {
        title: 'Pagination 分页',
        component: PaginationEditor,
        path: 'Pagination',
      },
      {
        title: 'Carousel 轮播',
        component: CarouselEditor,
        path: 'Carousel',
      },
      {
        title: 'Table 表格',
        component: TableEditor,
        path: 'Table',
      },
    ]

    this.state = {
      config: {},
      exportConf: false,
      open: this.editors[0].title,
    }

    this.resetConfig = this.resetConfig.bind(this)
    this.genConfig = this.genConfig.bind(this)
    this.setConfig = this.setConfig.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  setConfig(key, value) {
    this.setState(
      immer(draft => {
        draft.config[key] = value
      })
    )
  }

  handleClick(e) {
    const { target } = e
    if (!target.classList.contains('picker-title')) return

    const title = target.innerText
    this.setState(
      prev => ({
        open: title === prev.open ? '' : title,
      }),
      () => {
        const { path = undefined } = this.editors.find(v => v.title === title)
        if (path) history.push(path)
      }
    )
  }

  genConfig() {
    const { config } = this.state
    const str = JSON.stringify(config, null, 4)
    this.setState({ exportConf: str })
  }

  resetConfig() {
    this.setState({ config: {} })
  }

  render() {
    const { config, exportConf, open } = this.state
    const provideValue = {
      config,
      setConfig: this.setConfig,
      resetConfig: this.resetConfig,
      genConfig: this.genConfig,
    }
    return (
      <div className={headerClass('editor')}>
        <Provider value={provideValue}>
          <div className={headerClass('editor-content')} onClick={this.handleClick}>
            {this.editors.map(editor => (
              <editor.component
                header={<Head title={editor.title} active={editor.title === open} />}
                key={editor.title}
                open={open === editor.title}
              />
            ))}
          </div>
          <Foot />
        </Provider>
        <Modal visible={exportConf} onClose={() => this.setState({ exportConf: false })}>
          <div className={headerClass('export-conf')}>{exportConf}</div>
        </Modal>
      </div>
    )
  }
}
