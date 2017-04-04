import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'

class Stock extends Component {
	constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='stock container'>
          <h2>Склад</h2>
        </div>
      </div>
    )
  }
}


export default connect(
    state => ({
      menu: state.menu,
      stock: state.stock
    })
)(Stock)
