/**
 * cn - 动态用法
 *    -- 通过数组生成tags,动态增改
 * en - Dynamic usage
 *    -- create tags by use array, add and remove
 */

import React, { useState } from 'react'
import { Tag } from 'shineout'

const App: React.FC = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])
  const [inputVisible, setInputVisible] = useState(false)

  const remove = (removedTag: string) => {
    const t = tags.filter((tag: string) => tag !== removedTag)
    setTags(t)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputBlur = (value: string) => {
    let newTags = tags
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value]
    }
    console.log(newTags)
    setTags(newTags)
    setInputVisible(false)
  }

  return (
    <div>
      {tags.map(a => (
        <Tag key={a} onClose={() => remove(a)}>
          {a}
        </Tag>
      ))}
      {inputVisible ? (
        <Tag.Input onBlur={handleInputBlur} />
      ) : (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          + New Tag
        </Tag>
      )}
    </div>
  )
}

export default App
