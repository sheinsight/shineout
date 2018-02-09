import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { setTranslate } from '../utils/dom/translate'
import { tableClass } from '../styles'
import Scroll from '../Scroll'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

class SeperateTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      offsetLeft: 0,
      offsetMax: 0,
    }

    this.bindTbody = this.bindTbody.bind(this)
    this.bindThead = this.bindThead.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    /*
    const body = this.tbody
    this.setState({ scrollWidth: body.offsetWidth - body.clientWidth })

    this.handleScroll()
    */
    const body = this.tbody
    this.setState({
      contentWidth: body.offsetWidth,
      contentHeight: body.offsetHeight,
    })
  }

  bindTbody(el) {
    this.tbody = el
  }

  bindThead(el) {
    this.thead = el
  }

  handleScroll(left, top, max) {
    setTranslate(this.tbody, `-${left}px`, `-${top}px`)
    setTranslate(this.thead, `-${left}px`, '0');

    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${CLASS_FIXED_LEFT}`)
        .forEach((td) => { setTranslate(td, `${left}px`, '0') })
    })

    const right = max - left;
    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${CLASS_FIXED_RIGHT}`)
        .forEach((td) => { setTranslate(td, `-${right}px`, '0') })
    })

    this.setState({ offsetLeft: left, offsetMax: max })
  }

  handleColgroup(tds) {
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const width = tds[i].offsetWidth
      colgroup.push(width)
    }
    this.setState({ colgroup })
  }

  renderBody() {
    const {
      columns, data, width,
    } = this.props
    const { colgroup } = this.state
    if (typeof data === 'string') return <div>{data}</div>

    if (!Array.isArray(data)) return <div>error</div>

    if (data.length === 0) return <div>no data</div>

    return (
      <table ref={this.bindTbody} style={{ width }}>
        <Colgroup colgroup={colgroup} columns={columns} />
        <Tbody
          onBodyRender={this.handleColgroup}
          columns={columns}
          data={data}
        />
      </table>
    )
  }

  render() {
    const { columns } = this.props
    const {
      colgroup, offsetLeft, offsetMax, contentHeight, contentWidth,
    } = this.state

    const floatClass = []
    if (offsetLeft > 0) {
      floatClass.push('float-left')
    }
    if (offsetMax !== offsetLeft) {
      floatClass.push('float-right')
    }

    return [
      <div
        key="head"
        className={tableClass('head', ...floatClass)}
      >
        <table ref={this.bindThead}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead columns={columns} />
        </table>
      </div>,
      <Scroll
        key="body"
        scrollHeight={contentHeight}
        scrollWidth={contentWidth}
        onScroll={this.handleScroll}
        className={tableClass('body', ...floatClass)}
      >
        {this.renderBody()}
      </Scroll>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  onScrollLeft: PropTypes.func.isRequired,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  width: undefined,
}

export default SeperateTable
