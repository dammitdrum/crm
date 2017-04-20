import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import Header from './header'

class App extends Component {
  componentWillMount() {
    
  }
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.user.isAuth
  }
)

export default connect(mapStateToProps)(App)
