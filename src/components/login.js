import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="login container">
      	<div className="col-sm-4 col-sm-offset-4">
					<form name="enterForm">
						<h2>Вход</h2>
						<h4><strong>Логин</strong></h4>
						<input type="login" required/>
						<h4><strong>Пароль</strong></h4>
						<input type="password" required/>
						<hr/>
						<button  className="btn btn-success" type="submit" onClick={ ::this.props.setAuthTrue }>Вход</button>
					</form>
				</div>
      </div>
    )
  }
}

export default Login
