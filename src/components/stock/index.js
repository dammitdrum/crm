import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Controls from './controls'
import Table from './table'
import StockModal from './modal'
import * as Actions from '../../actions/stockActions'
import Enum from '../../utils/Enum'

class Stock extends Component {
  
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
    let props = this.props
    let content
    let items = []
    let categories = []

    categories = [Enum.defaultCatStock].concat(
      _.uniqBy(props.items, 'category').map((item) => item.category).sort()
    )
    if (props.activeCategory !== Enum.defaultCatStock) {
      items = _.filter(
        props.items, 
        item => item.category === props.activeCategory
      )
    } else {
      items = props.items
    }
    if (props.searchQuery) {
      items = _.filter(
        items, 
        item => item.name.toLowerCase().indexOf(props.searchQuery.trim()) !== -1
      )
    }
    items = _.orderBy(items, [props.sortBy.code], [props.sortBy.type])

    return (
      <div className='stock container'>
        <h2 className="main_title">{ props.title }</h2>
        <Controls 
          categories={ categories }
          clickCategory={ ::this.clickCategory }
          activeCategory={ props.activeCategory }
          changeSearch={ ::this.changeSearch }
          openModal={ ::this.openModal }
          clearSearch={ ::this.clearSearch }
          query={ props.searchQuery }
        />
        <Table 
          data={ props }
          items= { items }
          onSort={ ::this.onSort }
          onDelete={ ::this.onDelete }
          openModal={ ::this.openModal }
        />
        <StockModal 
          params={ props.modal }
          item={ props.modal.itemId ? 
            props.items.filter(item => item._id === props.modal.itemId)[0] : null }
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
