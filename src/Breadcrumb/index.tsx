import React from 'react'
import classnames from 'classnames'
import Popover from '../Popover'
import { defaultProps } from '../utils/defaultProps'
import { breadcrumbClass } from './styles'
import { getKey } from '../utils/uid'
import Caret from '../icons/Caret'
import { BreadcrumbProps, BreadcrumbData, StructureArray } from './Props'

const defaultValue = {
  ...defaultProps,
  data: [],
  separator: '/',
}

class Breadcrumb<Item = BreadcrumbData> extends React.PureComponent<BreadcrumbProps<Item>> {
  static defaultProps = defaultValue

  static displayName: string

  renderArray(data: StructureArray<Item>) {
    const first = data[0] as Item
    return (
      <span>
        {this.renderItem(first)}
        <span className={breadcrumbClass('down')}>{<Caret />}</span>
        <Popover position="bottom">
          {(data as Item[]).slice(1).map((d, i) => (
            <div className={breadcrumbClass('dropdown-item')} key={i}>
              {this.renderItem(d)}
            </div>
          ))}
        </Popover>
      </span>
    )
  }

  renderItem(dataItem: Item) {
    const { renderItem } = this.props
    const d = dataItem as BreadcrumbData
    let item = d.title
    if (!React.isValidElement(item)) {
      if (d.onClick || d.url) {
        const props: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
          onClick: d.onClick,
        }
        if (d.url) props.href = d.url
        item = (
          <a {...props}>
            {d.icon}
            &nbsp;
            {d.title}
          </a>
        )
      } else {
        item = (
          <b>
            {d.icon}
            &nbsp;
            {d.title}
          </b>
        )
      }
    }
    return renderItem ? renderItem(dataItem) : item
  }

  render() {
    const { data, separator, keygen } = this.props
    const className = classnames(breadcrumbClass('_'), this.props.className)

    return (
      <div className={className} style={this.props.style}>
        {data &&
          data.map((d, index) => (
            <span key={keygen ? getKey(d, keygen, index) : index}>
              {Array.isArray(d) ? this.renderArray(d) : this.renderItem(d)}
              {index !== data.length - 1 ? <span className={breadcrumbClass('separator')}>{separator}</span> : null}
            </span>
          ))}
      </div>
    )
  }
}

Breadcrumb.displayName = 'ShineoutBreadcrumb'

export default Breadcrumb
