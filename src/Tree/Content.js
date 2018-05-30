import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { treeClass } from '../styles'

class Content extends PureComponent {
  renderNode() {
    const { data, renderItem, expanded } = this.props
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, expanded)
  }

  render() {
    const { data, onClick, expanded } = this.props
    const hasChildren = data.children && data.children.length > 0

    return (
      <div>
        {
          hasChildren &&
          <a
            href="javascript:;"
            onClick={onClick}
            className={treeClass(`icon-${expanded ? 'sub' : 'plus'}`)}
          >
            <span />
          </a>
        }
        <div className={treeClass('content')}>
          {this.renderNode()}
        </div>
      </div>
    )
  }
}

Content.propTypes = {
  data: PropTypes.object,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
}

export default Content
