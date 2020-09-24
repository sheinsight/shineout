/**
 * cn - 尺寸
 *    -- 通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。
 * en - size
 *    -- If a large or small list is desired, set the size property to either large or small respectively. Omit the size property for a list with the default size.
 */
import React from 'react'
import { List, Select } from 'shineout'

const data = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
]

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      size: 'default',
    }
    this.select = ['small', 'default', 'large']
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(rowData) {
    return (
      <List.BaseItem
        avatar="../../../images/list.png"
        content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${
          rowData.country
        }, office: ${rowData.office}`}
        desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
        title={rowData.start}
      />
    )
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ marginRight: 16, fontWeight: 700 }}>Size: </span>
          <Select
            width={120}
            data={this.select}
            keygen
            value={this.state.size}
            onChange={size => this.setState({ size })}
          />
        </div>
        <List keygen="id" size={this.state.size} data={data} renderItem={this.renderItem} />
      </div>
    )
  }
}

export default Index
