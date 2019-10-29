import React from 'react'
import PropTypes from 'prop-types'
import Btns from './btns'
import { Component } from '../component'
import Card from './Card'
import { transferClass } from '../styles'
import Context from './context'

class Transfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checks: [[], []],
    }
    this.setChecks = this.setChecks.bind(this)
  }

  setChecks(index, value) {
    const { checks } = this.state
    const newChecks = index ? [checks[0], value] : [value, checks[1]]
    this.setState({
      checks: newChecks,
    })
  }

  render() {
    const { titles, data, datum, keygen, renderItem } = this.props
    const { checks } = this.state

    const sources = data.filter(d => !datum.check(d))
    const targets = data.filter(d => datum.check(d))

    return (
      <div className={transferClass('_')}>
        <Context.Provider value={{ checks, setChecks: this.setChecks }}>
          <Card
            title={titles[0]}
            checks={checks[0]}
            data={sources}
            keygen={keygen}
            renderItem={renderItem}
            setChecks={this.setChecks}
            index={0}
          />
          <Btns
            checks={checks}
            datum={datum}
            setChecks={this.setChecks}
            keygen={keygen}
            sources={sources}
            targets={targets}
            data={data}
          />
          <Card
            title={titles[1]}
            checks={checks[1]}
            data={targets}
            keygen={keygen}
            renderItem={renderItem}
            setChecks={this.setChecks}
            index={1}
          />
        </Context.Provider>
      </div>
    )
  }
}

Transfer.defaultProps = {
  titles: [],
  data: [],
}

Transfer.propTypes = {
  titles: PropTypes.array,
  data: PropTypes.array,
  datum: PropTypes.object,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Transfer
