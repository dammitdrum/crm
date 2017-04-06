import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import Categories from '../components/stock/categories'
import Table from '../components/stock/table'
import { getStockData } from '../actions/stockActions'

class Stock extends Component {
	constructor(props) {
    super(props)
    if (!props.loaded) {
      props.getStock()
    }
  }
  render() {
    let data = this.props, content

    if (data.loading) {
      content = <h3 className='text-center'><strong>loading...</strong></h3>
    } 
    if (data.error) {
      content = <h3 className='text-center'><strong>Ops...</strong></h3>
    } 
    if (data.items) {
      let categories = _.uniqBy(data.items, 'category').map((item) => item.category)
      categories.unshift('Все категории')
      content = (
        <div>
          <Categories categories={ categories }/>
          <Table items={ data.items }/>
        </div>
      )
    }
    return (
      <div>
        <Header/>
        <div className='stock container'>
          <h2 className="main_title">{ data.title }</h2>
          { content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    title: state.stock.title,
    items: state.stock.items,
    loaded: state.stock.loaded
  }
)

const mapDispatchToProps = dispatch => (
  {
    getStock: bindActionCreators(getStockData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
