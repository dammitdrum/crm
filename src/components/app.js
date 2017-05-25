import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { Alert, Fade } from 'react-bootstrap'

import Header from './header'
import * as appActions from '../actions/appActions'

class App extends Component {
  componentWillMount() {
    if (!this.props.isAuth) {
      this.props.checkAuth()
    }
  }
  componentDidUpdate() {
    if (!this.props.loaded && this.props.isAuth && !this.props.loading) {
      this.props.loadData()
    }
    if (this.props.toLogin) {
      hashHistory.push('/login')
    }
  }
  alertDismiss() {
    this.props.hideMess()
  }
  render() {
    let props = this.props, content

    content = <h2 className='text-center mgt'>Аутентификация...</h2>
    if (props.loading) {
      content = <h2 className='text-center mgt'>Данные загружаются...</h2>
    }
    if (props.error) {
      content = <h2 className='text-center mgt'>Что-то пошло не так...</h2>
    }
    if (props.loaded) {
      content = this.props.children
    }
    return (
      <div>
        <Header/>
        <Fade className='container' in={ props.showMess } unmountOnExit={ true }>
          <Alert bsStyle='info' onDismiss={ ::this.alertDismiss }>
            <h4>Кто-то что-то изменил!</h4>
            <p>Будь внимателен юнный джедай!</p>
          </Alert>
        </Fade>
        { content }
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.app.isAuth,
    toLogin: state.app.toLogin,
    loaded: state.app.loaded,
    loading: state.app.loading,
    error: state.app.error,
    showMess: state.app.showMess
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadData:  bindActionCreators(appActions.loadData, dispatch),
    checkAuth: bindActionCreators(appActions.auth, dispatch),
    hideMess:  bindActionCreators(appActions.hideMess, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
