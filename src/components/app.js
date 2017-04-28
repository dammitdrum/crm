import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import * as Actions from '../actions/appActions'

class App extends Component {
  componentWillMount() {
    if (!this.props.loaded) {
      this.props.loadData();
    }
  }
  render() {
    let props = this.props, content
    
    if (props.loading) {
      content = <h1 className='text-center'>Данные загружаются...</h1>
    }
    if (props.error) {
      content = <h1 className='text-center'>Что-то пошло не так...</h1>
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
    loaded: state.app.loaded,
    loading: state.app.loading,
    error: state.app.error,
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadData: bindActionCreators(Actions.loadData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
