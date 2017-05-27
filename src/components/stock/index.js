import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Overlay, Popover } from 'react-bootstrap'

import Validator from '../../utils/validator'
import validateConfig from '../../config/validate/stock'
import accessConfig from '../../config/access/stock'

import Controls from './controls'
import Table from './table'
import StockModal from './modal'
import * as Actions from '../../actions/stockActions'
import Enum from '../../utils/Enum'

class Stock extends Component {
  componentWillMount() {
    this.validator = new Validator(this.props.validate, validateConfig)
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
    let item = itemId ? _.find(this.props.items, item => item._id === itemId) : null
    let mode = itemId ? 'edit' : 'create'
    this.props.showModal({ show: true, mode, item: item })
  }
  closeModal() {
    this.props.showModal({
      ...this.props.modal,
      show: false
    })
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
  onChangeModal(e) {
    let name = e.target.getAttribute('name')
    let val = e.target.value
    this.props.changeModalItem({
      ...this.props.modal.item,
      [name]: val
    })
    if (_.find(validateConfig, prop => prop.name === name)) {
      this.validator.validate({ [name]: val })
    }
  }
  onDelete(e) {
    let id = e.currentTarget.getAttribute('data-id')
    this.props.deleteItem(id)
  }
  submitModal(e) {
    let item = this.props.modal.item
    if (!this.validator.validate(item)) return
    item._id ?
      this.props.updateItem(item) : this.props.createItem(item)
  }
  _filter(props) {
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
    return { categories, items }
  }
  render() {
    let props = this.props
    let access = accessConfig[props.access]
    let filtered = this._filter(props)

    return (
      <div className='stock container'>
        <h2 className="main_title">Прайс-лист</h2>
        <Controls 
          access={ access.controls }
          categories={ filtered.categories }
          clickCategory={ ::this.clickCategory }
          activeCategory={ props.activeCategory }
          changeSearch={ ::this.changeSearch }
          openModal={ ::this.openModal }
          clearSearch={ ::this.clearSearch }
          query={ props.searchQuery }
        />
        <Table 
          access={ access.table }
          data={ props }
          items= { filtered.items }
          onSort={ ::this.onSort }
          onDelete={ ::this.onDelete }
          openModal={ ::this.openModal }
        />
        <StockModal 
          params={ props.modal }
          item={ props.modal.item }
          close={ ::this.closeModal }
          onChange={ ::this.onChangeModal }
          submit={ ::this.submitModal }
        />
        <Overlay
          show={ props.validateMess.show }
          placement={ props.validateMess.side || 'top' }
          container={ document.querySelector('[data-valid-wrap="'+props.validateMess.name+'"]') }
          target={ document.querySelector('[data-valid="'+props.validateMess.name+'"]') }>
          <Popover 
            id="popover-contained" 
            title={ props.validateMess.title }>
            { props.validateMess.message }
          </Popover>
        </Overlay>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    items: state.stock.items,
    searchQuery: state.stock.searchQuery,
    activeCategory: state.stock.activeCategory,
    modal: state.stock.modal,
    sortBy: state.stock.sortBy,
    validateMess: state.stock.validateMess,
    access: state.user.access
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
    changeModalItem:  bindActionCreators(Actions.changeModalItem, dispatch),
    deleteItem:       bindActionCreators(Actions.deleteItem, dispatch),
    validate:         bindActionCreators(Actions.validate, dispatch),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
