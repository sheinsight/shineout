import React, { useState } from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    onClick: true,
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '21',
    title: 'Navigation 21',
  },
  {
    id: '22',
    title: 'Navigation 22',
  },
  {
    id: '23',
    title: 'Navigation 23',
  },
  {
    id: '24',
    title: 'Navigation 24',
  },
  {
    id: '30',
    title: 'Navigation 30',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
]

export default () => {
  const [active, setActive] = useState(['1'])

  const renderItem = d => d.title

  const handleClick = d => setActive([d.id])

  const checkActive = d => active.includes(d.id)

  return (
    <Menu
      data={data}
      keygen="id"
      mode="vertical-auto"
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      renderItem={renderItem}
      style={{ width: 256, height: 300 }}
    />
  )
}
