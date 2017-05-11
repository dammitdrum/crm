import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Overlay, Popover } from 'react-bootstrap'
import * as Actions from '../../actions/userActions'
import UserModal from './modal'
import Validator from '../../utils/validator'
import validateConfig from '../../config/validate/user'
import accessConfig from '../../config/access/user'

class User extends Component {
  componentWillMount() {
    this.validator = new Validator(this.props.validate, validateConfig)
  }
  logout() {
    this.props.logout()
  }
  openModal(e) {
    let userId = e.currentTarget.getAttribute('data-id')
    let user = userId ? _.find(this.props.users, user => user._id === userId) : null
    let mode = userId ? 'edit' : 'create'
    this.props.showModal({ show: true, mode, user: user })
  }
  closeModal() {
    this.props.showModal({
      ...this.props.modal,
      show: false
    })
  }
  onChangeModal(e) {
    let name = e.target.getAttribute('name')
    let val = e.target.value
    this.props.changeUserModal({
      ...this.props.modal.user,
      [name]: val
    })
    if (_.find(validateConfig, prop => prop.name === name)) {
      this.validator.validate({ [name]: val })
    }
  }
  onDelete(e) {
    let id = e.currentTarget.getAttribute('data-id')
    this.props.deleteUser(id)
  }
  submitModal(e) {
    let user = this.props.modal.user
    if (!this.validator.validate(user)) return
    user._id ?
      this.props.updateUser(user) : this.props.createUser(user)
  }
  getItemList(user, i) {
    if (user.access === 'superAdmin') {
      return
    }
    return (
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
          <button 
            className='btn btn-sm btn-warning mgb-5' 
            onClick={ ::this.openModal }
            data-id={ user._id }>
            <span className='glyphicon glyphicon-pencil'></span>
          </button>
          <br/>
          <button 
            className='btn btn-sm btn-danger' 
            onClick={ ::this.onDelete }
            data-id={ user._id }>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </div>
      </div>
    )
  }
  render() {
    let props = this.props
    let access = accessConfig[props.access]

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
              props.users.length && access.component === 100 ?
              <div>
                <hr/>
                <button className='btn-default btn' onClick={ ::this.openModal }>
                  Создать пользователя <span className='glyphicon glyphicon-plus'></span>
                </button>
                <p></p>
                {
                  props.users.map((user, i) => 
                    this.getItemList(user, i)
                  )
                }
              </div>
              : ''
            }
            <UserModal 
              params={ props.modal }
              user={ props.modal.user }
              close={ ::this.closeModal }
              onChange={ ::this.onChangeModal }
              submit={ ::this.submitModal }
            />
            <Overlay
              show={ props.validateMess.show }
              placement={ props.validateMess.side || 'top' }
              container={ document.querySelector('[data-valid-wrap="'+props.validateMess.name+'"]') }
              target={ document.querySelector('[data-valid="'+props.validateMess.name+'"]') }>
              <Popover 
                id="popover-contained" 
                title={ props.validateMess.title }>
                { props.validateMess.message }
              </Popover>
            </Overlay>

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
    modal: state.user.modal,
    validateMess: state.user.validateMess
  }
)

const mapDispatchToProps = dispatch => (
  {
    logout:           bindActionCreators(Actions.logout, dispatch),
    showModal:        bindActionCreators(Actions.showModal, dispatch),
    createUser:       bindActionCreators(Actions.createUser, dispatch),
    updateUser:       bindActionCreators(Actions.updateUser, dispatch),
    changeUserModal:  bindActionCreators(Actions.changeUserModal, dispatch),
    deleteUser:       bindActionCreators(Actions.deleteUser, dispatch),
    validate:         bindActionCreators(Actions.validate, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(User)