import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions/appActions'


class Login extends Component {
	componentWillMount() {
    if (!this.props.isAuth) {
      this.props.checkAuth()
    } else {
    	hashHistory.push('/')
    }
  }
	componentDidUpdate() {
		if (this.props.isAuth) {
      hashHistory.push('/')
    }
	}
	onLogin(e) {
		e.preventDefault()
		this.props.onLogin({
			login: e.target.querySelector('[name="login"]').value,
			password: e.target.querySelector('[name="password"]').value
		})
	}
  render() {
    return (
      <div className="login container">
      	<div className="col-sm-4 col-sm-offset-4">
					<form name="enterForm" onSubmit={ ::this.onLogin }>
						<h2>Вход</h2>
						<h4><strong>Логин</strong></h4>
						<input type="text" name='login' required/>
						<h4><strong>Пароль</strong></h4>
						<input type="password" name='password' required/>
						<hr/>
						<button  className="btn btn-success" type="submit">Вход</button>
					</form>
				</div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.app.isAuth
  }
)

const mapDispatchToProps = dispatch => (
  {
    onLogin: bindActionCreators(Actions.onLogin, dispatch),
    checkAuth: bindActionCreators(Actions.auth, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
