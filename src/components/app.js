import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import Header from './header'
import * as Actions from '../actions/appActions'

class App extends Component {
  componentWillMount() {
    if (!this.props.isAuth) {
      this.props.checkAuth()
    }
  }
  componentDidUpdate() {
    if (!this.props.loaded && this.props.isAuth && !this.props.loading) {
      this.props.loadData();
    }
    if (this.props.toLogin) {
      hashHistory.push('/login')
    }
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
    error: state.app.error
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadData: bindActionCreators(Actions.loadData, dispatch),
    checkAuth: bindActionCreators(Actions.auth, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
