import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/userActions'

class User extends Component {
  logout() {
    this.props.logout()
  }
  createUser() {

  }
  render() {
    let props = this.props

    return (
    	<div className='user container'>
        <div className='row'>
          <div className='col-sm-8 col-sm-offset-2'>
            <h2><span className='glyphicon glyphicon-user'></span> Пользователь</h2>
            <p>Имя пользователя:<strong> { props.name }</strong></p>
            <p></p>
            <p>Логин пользователя:<strong> { props.login }</strong></p>
            <p></p>
            <p>Уровень доступа: <strong> { props.access }</strong> </p>
            <p></p>
            <button className='btn btn-info' onClick={ ::this.logout }>Выйти</button>
            {
              props.access === 'admin' ?
              <div>
                <hr/>
                <button className='btn-default btn' onClick={ ::this.createUser }>
                  Создать пользователя <span className='glyphicon glyphicon-plus'></span>
                </button>
                <p></p>
                {
                  props.users.map((user, i) => 
                    <div className='row' key={ i }>
                      <div className='col-sm-10'>
                        <div className='panel panel-info'>
                          <div className='panel-heading'> 
                            <h3 className='panel-title'>{ user.name }</h3> 
                          </div> 
                          <div className='panel-body'> 
                            <p>Логин: <strong>{ user.login }</strong></p>
                            <p>Уровень доступа: <strong>{ user.access }</strong></p>
                          </div>
                        </div>
                      </div>
                      <div className='offset-sm-1 col-sm-1'>
                        <button className='btn btn-sm btn-warning mgb-5'>
                          <span className='glyphicon glyphicon-pencil'></span>
                        </button>
                        <br/>
                        <button className='btn btn-sm btn-danger'>
                          <span className='glyphicon glyphicon-remove'></span>
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
              : ''
            }
            
          </div>
        </div>
    	</div>
    )
  }
}

const mapStateToProps = state => (
  {
    name: state.user.name,
    login: state.user.login,
    access: state.user.access,
    users: state.user.users,
  }
)

const mapDispatchToProps = dispatch => (
  {
    logout: bindActionCreators(Actions.logout, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(User)