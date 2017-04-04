import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('componentDidMount: App');
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='main container'>
          <h3>Hello world!</h3>
        </div>
      </div>
    )
  }
}

export default connect(
    (state) => ({
      header: state.header,
      stock: state.stock
    })
)(App)
