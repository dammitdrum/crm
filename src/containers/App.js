import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'

class App extends Component {
	
	componentWillMount() {
		if (!this.props.isAuth) {
			this.props.router.push('/login')
		}
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
