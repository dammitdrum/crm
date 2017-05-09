import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Overlay, Popover } from 'react-bootstrap'

import Validator from '../../utils/validator'
import validateConfig from '../../config/validate/clients'
import accessConfig from '../../config/access/clients'

import Controls from './controls'
import Table from './table'
import ClientModal from './modal'
import * as Actions from '../../actions/clientsActions'

class Clients extends Component {
  componentWillMount() {
    this.validator = new Validator(this.props.validate, validateConfig)
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
    console.log(item)
    if (!this.validator.validate({ name: item.name, fullName: item.fullName })) return
    item._id ?
      this.props.updateItem(item) : this.props.createItem(item)
  }
  render() {
    let props = this.props
    let access = accessConfig[props.access]
    let items = props.items

    if (props.searchQuery) {
      items = _.filter(
        items, 
        item => item.fullName.toLowerCase().indexOf(props.searchQuery.trim()) !== -1
      )
    }
    items = _.orderBy(items, [props.sortBy.code], [props.sortBy.type])

    return (
      <div className='clients container'>
        <h2 className="main_title">Контрагенты</h2>
        <Controls 
          access={ access.controls }
          changeSearch={ ::this.changeSearch }
          openModal={ ::this.openModal }
          clearSearch={ ::this.clearSearch }
          query={ props.searchQuery }
        />
        <Table 
          access={ access.table }
          data={ props }
          items= { items }
          onSort={ ::this.onSort }
          onDelete={ ::this.onDelete }
          openModal={ ::this.openModal }
        />
        <ClientModal 
          access={ access.modal }
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
    items: state.clients.items,
    searchQuery: state.clients.searchQuery,
    modal: state.clients.modal,
    sortBy: state.clients.sortBy,
    validateMess: state.clients.validateMess,
    access: state.user.access
  }
)

const mapDispatchToProps = dispatch => (
  {
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

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
