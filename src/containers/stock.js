import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import Controls from '../components/stock/controls'
import Table from '../components/stock/table'
import StockModal from '../components/stock/modal'
import * as Actions from '../actions/stockActions'
import Enum from '../Enum'

class Stock extends Component {
	constructor(props) {
    super(props)
    if (!props.loaded) {
      props.getData()
    } 
  }
  clickCategory(e) {
    if (e.target.closest('.active')) return
    this.props.filterByCategory(e.target.innerText)
  }
  changeSearch(e) {
    this.props.filterBySearch(e.target.value)
  }
  openModal(e) {
    let itemId = e.currentTarget.getAttribute('data-id')
    let mode = itemId ? 'edit' : 'create'
    this.props.showModal({ show: true, mode, itemId })
  }
  closeModal() {
    this.props.showModal({ show: false, mode: this.props.modal.mode})
  }
  onSort(e) {
    let code = e.currentTarget.getAttribute('data-sort')
    let type = this.props.sortBy.type === 'desc' ? 'asc' : 'desc'
    type = code !== this.props.sortBy.code ? 'asc' : type
    this.props.sortData({ code, type })
  }
  onDelete(e) {
    let id = e.currentTarget.getAttribute('data-id')
    this.props.deleteItem(id)
  }
  submitModal(e) {
    e.preventDefault()
    let modalData = {}
    e.target.querySelectorAll('input[name]').forEach(field => {
      modalData[field.getAttribute('name')] = field.value
    })
    console.log(modalData)
    if (this.props.modal.itemId) {
      this.props.updateItem(modalData)
    } else {
      this.props.createItem(modalData)
    }
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
            onSort={ ::this.onSort }
            onDelete={ ::this.onDelete }
            openModal={ ::this.openModal }
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
        <StockModal 
          params={ data.modal }
          item={ data.modal.itemId ? 
            data.items.filter(item => item._id === data.modal.itemId)[0] : null }
          close={ ::this.closeModal }
          submit={ ::this.submitModal }
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
    modal: state.stock.modal,
    loaded: state.stock.loaded,
    loading: state.stock.loading,
    sortBy: state.stock.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    getData:          bindActionCreators(Actions.getData, dispatch),
    filterByCategory: bindActionCreators(Actions.filterByCategory, dispatch),
    filterBySearch:   bindActionCreators(Actions.filterBySearch, dispatch),
    showModal:        bindActionCreators(Actions.showModal, dispatch),
    sortData:         bindActionCreators(Actions.sortData, dispatch),
    createItem:       bindActionCreators(Actions.createItem, dispatch),
    updateItem:         bindActionCreators(Actions.updateItem, dispatch),
    deleteItem:       bindActionCreators(Actions.deleteItem, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
