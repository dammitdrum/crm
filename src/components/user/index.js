import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/userActions'

class User extends Component {
  render() {
    return (
    	<div className='user container'>
    		<h3>This is user baby!</h3>
    	</div>
    )
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.user.isAuth
  }
)

const mapDispatchToProps = dispatch => (
  {
    setAuthTrue: bindActionCreators(Actions.setAuthTrue, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(User)