import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Controls from './controls'
import Table from './table'
import StockModal from './modal'
import * as Actions from '../../actions/stockActions'
import Enum from '../../utils/Enum'

class Stock extends Component {
  componentWillMount() {
    
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
  clearSearch() {
    this.props.filterBySearch('')
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
    if (this.props.modal.itemId) {
      this.props.updateItem(modalData, this.props.modal.itemId)
    } else {
      this.props.createItem(modalData)
    }
  }
  render() {
    let data = this.props
    let content
    let items = []
    let categories = []

    // data fetched
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
            clickCategory={ ::this.clickCategory }
            activeCategory={ data.activeCategory }
            changeSearch={ ::this.changeSearch }
            openModal={ ::this.openModal }
            clearSearch={ ::this.clearSearch }
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
      <div className='stock container'>
        <h2 className="main_title">{ data.title }</h2>
        { content }
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
    error: state.stock.error,
    sortBy: state.stock.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    filterByCategory: bindActionCreators(Actions.filterByCategory, dispatch),
    filterBySearch:   bindActionCreators(Actions.filterBySearch, dispatch),
    showModal:        bindActionCreators(Actions.showModal, dispatch),
    sortData:         bindActionCreators(Actions.sortData, dispatch),
    createItem:       bindActionCreators(Actions.createItem, dispatch),
    updateItem:       bindActionCreators(Actions.updateItem, dispatch),
    deleteItem:       bindActionCreators(Actions.deleteItem, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
