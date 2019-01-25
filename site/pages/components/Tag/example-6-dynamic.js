/**
 * cn - 动态用法
 *    -- 通过数组生成tags,动态增改
 * en - Dynamic usage
 *    -- create tags by use array, add and remove
 */

import React, { Component } from 'react'
import { Tag } from 'shineout'

export default class extends Component {
  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
  }

  remove = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true })
  }

  handleInputBlur = value => {
    const { tags } = this.state
    let newTags = tags
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value]
    }
    console.log(newTags)
    this.setState({
      tags: newTags,
      inputVisible: false,
    })
  }

  render() {
    const { tags, inputVisible } = this.state
    return (
      <div>
        {tags.map(a => (
          <Tag key={a} onClose={() => this.remove(a)}>
            {a}
          </Tag>
        ))}
        {inputVisible ? (
          <Tag.Input onBlur={this.handleInputBlur} />
        ) : (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            + New Tag
          </Tag>
        )}
      </div>
    )
  }
}
