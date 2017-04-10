import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import Controls from '../components/stock/controls'
import Table from '../components/stock/table'
import ItemModal from '../components/stock/itemModal'
import { 
    getStockData, 
    filterByCategory, 
    filterBySearch, 
    showItemModal,
    sortStockData,
    createItem
  } from '../actions/stockActions'
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
    this.props.filterByCategory(e.target.innerText)
  }
  changeSearch(e) {
    this.props.filterBySearch(e.target.value)
  }
  openModal() {
    this.props.showItemModal(true)
  }
  closeModal() {
    this.props.showItemModal(false)
  }
  clickSort(e) {
    let code = e.target.getAttribute('data-sort')
    let type = this.props.sortBy.type === 'desc' ? 'asc' : 'desc'
    type = code !== this.props.sortBy.code ? 'asc' : type
    this.props.sortStockData({ code, type })
  }
  submitCreate(e) {
    e.preventDefault()
    this.props.createItem({
      name: e.target.name.value,
      art: e.target.art.value,
      price: e.target.price.value,
      category: e.target.category.value
    })
  }
  render() {
    let data = this.props
    let content
    let items = []
    let categories = []

    if (data.loading) {
      content = <h3 className='text-center'><strong>loading...</strong></h3>
    }

    if (data.error) {
      content = <h3 className='text-center'><strong>Ops...</strong></h3>
    }

    // data not empty
    if (data.loaded) {
      categories = [Enum.defaultCatStock].concat(
        _.uniqBy(data.items, 'category').map((item) => item.category).sort()
      )
      if (data.activeCategory !== Enum.defaultCatStock) {
        items = _.filter(
          data.items, 
          item => item.category === data.activeCategory
        )
      } else {
        items = data.items
      }
      if (data.searchQuery) {
        items = _.filter(
          items, 
          item => item.name.toLowerCase().indexOf(data.searchQuery.trim()) !== -1
        )
      }
      items = _.orderBy(items, [data.sortBy.code], [data.sortBy.type])
      content = (
        <div>
          <Controls 
            categories={ categories } 
            categoryHandler={ ::this.clickCategory }
            activeCategory={ data.activeCategory }
            inputHandler={ ::this.changeSearch }
            openModal={ ::this.openModal }
            query={ data.searchQuery }
          />
          <Table 
            data={ data }
            items= { items }
            clickSort={ ::this.clickSort }
          />
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
        <ItemModal 
          toggle={ data.isOpenItemModal } 
          close={ ::this.closeModal }
          submit={ ::this.submitCreate }
        />
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    title: state.stock.title,
    items: state.stock.items,
    searchQuery: state.stock.searchQuery,
    activeCategory: state.stock.activeCategory,
    isOpenItemModal: state.stock.isOpenItemModal,
    loaded: state.stock.loaded,
    loading: state.stock.loading,
    sortBy: state.stock.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    getStockData: bindActionCreators(getStockData, dispatch),
    filterByCategory: bindActionCreators(filterByCategory, dispatch),
    filterBySearch: bindActionCreators(filterBySearch, dispatch),
    showItemModal: bindActionCreators(showItemModal, dispatch),
    sortStockData: bindActionCreators(sortStockData, dispatch),
    createItem: bindActionCreators(createItem, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
