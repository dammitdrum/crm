import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import Categories from '../components/stock/categories'
import Table from '../components/stock/table'
import { getStockData, filterByCategory } from '../actions/stockActions'
import Enum from '../Enum'

class Stock extends Component {
	constructor(props) {
    super(props)
    if (!props.loaded) {
      props.getStockData()
    }
  }
  clickCategory(e) {
    if (e.target.closest('.active')) return
    let category = e.target.innerText
    let items = []
    if (category !== Enum.defaultCatStock) {
      items = _.filter(this.props.items, item => item.category === category)
    }
    this.props.filterByCategory(items, category)
  }
  render() {
    let data = this.props, content

    if (data.loading) {
      content = <h3 className='text-center'><strong>loading...</strong></h3>
    } 
    if (data.error) {
      content = <h3 className='text-center'><strong>Ops...</strong></h3>
    } 
    if (data.items.length) {
      let categories = [Enum.defaultCatStock].concat(
        _.uniqBy(data.items, 'category').map((item) => item.category).sort()
      )
      content = (
        <div>
          <Categories 
            categories={ categories } 
            handler={ ::this.clickCategory }
            active={ data.activeCategory }
          />
          <Table items={ data.filtered.length ? data.filtered : data.items }/>
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
    filtered: state.stock.filtered,
    activeCategory: state.stock.category,
    loaded: state.stock.loaded,
    loading: state.stock.loading
  }
)

const mapDispatchToProps = dispatch => (
  {
    getStockData: bindActionCreators(getStockData, dispatch),
    filterByCategory: bindActionCreators(filterByCategory, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
