import React, { PureComponent } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Home } from './pages'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            header
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
}

export default App
