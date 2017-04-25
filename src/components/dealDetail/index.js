import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Controls from './controls'
import Table from './table'
import DealModal from './modal'
import * as Actions from '../../actions/dealDetailActions'
import { getUsers } from '../../actions/userActions'
import { getData as getStock} from '../../actions/stockActions'
import { getData as getClients} from '../../actions/clientsActions'

class Deal extends Component {
	componentWillMount() {
    if (!this.props.user.loaded) {
      this.props.getUsers()
    }
    if (!this.props.stock.loaded) {
      this.props.getStock()
    }
    if (!this.props.clients.loaded) {
      this.props.getClients()
    }
    this.props.setDealState('new')
    this.props.setDealManager(this.props.user)
  }
  setDealState(e) {
    if (e.currentTarget.classList.contains('active')) return
    this.props.setDealState(e.currentTarget.getAttribute('data-state'))
  }
  setDealManager(e) {
    let login = e.currentTarget.getAttribute('data-id')
    let manager = _.find(this.props.user.users, (manager) => manager.login === login)
    this.props.setDealManager(manager)
  }
  openModal(e) {
    let mode = e.currentTarget.getAttribute('data-modal')
    let code = mode === 'stock' ? 'price' : 'name'
    this.props.showModal({
      show: true,
      mode,
      sortBy: { code, type: 'asc' },
      searchQuery: ''
    })
  }
  closeModal() {
    this.props.showModal({
      ...this.props.modal,
      show: false
    })
  }
  onSortModal(e) {
    let sortBy = this.props.modal.sortBy
    let code = e.currentTarget.getAttribute('data-sort')
    let type = sortBy.type === 'desc' ? 'asc' : 'desc'
    type = code !== sortBy.code ? 'asc' : type
    this.props.sortModal({ code, type })
  }
  searchModal(e) {
    this.props.searchModal(e.target.value)
  }
  clearSearchModal() {
    this.props.searchModal('')
  }
  _findItem(collection, e) {
    let id = e.currentTarget.getAttribute('data-id')
    return _.find(collection, item => item._id === id)
  }
  addItem(e) {
    let stock = _.cloneDeep(this.props.stock.items)
    let item = this._findItem(stock, e)
    let addedItem = _.find(this.props.items, i => i._id === item._id)
    if (addedItem) {
      let number = addedItem.number
      let id = addedItem._id
      this.props.setItemNumber(++number, id)
    } else {
      item.number = 1
      this.props.addItem(item)
    }
    this.calculate()
  }
  removeItem(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.removeItem(id)
    this.calculate()
  }
  setClient(e) {
    this.props.setClient(this._findItem(this.props.clients.items, e))
  }
  setPrice(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.setItemPrice(e.target.value, id)
    this.calculate()
  }
  setNumber(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.setItemNumber(e.target.value, id)
    this.calculate()
  }
  calculate() {
    let sum = 0
    console.log(this.props.items.length)
    this.props.items.forEach(item => {
      sum += item.price * item.number
    })
    this.props.setSum(sum)
  }
  render() {
    let props = this.props 

    return (
      <div className='deal_detail container'>
        <h3>{ props.title }</h3>
        <hr/>
        <form name="form" className="modal_form clearfix">
          <Controls 
            dealState={ props.state }
            clickStateBtn={ ::this.setDealState }
            managerList={ props.user.users }
            manager={ props.manager }
            client={ props.client }
            selectManager={ ::this.setDealManager }
            openModal={ ::this.openModal }
          />
          <div className="air"></div>
          <Table 
            items={ props.items }
            openModal={ ::this.openModal }
            removeItem={ ::this.removeItem }
            setPrice={ ::this.setPrice }
            setNumber={ ::this.setNumber }
            sum={ props.sum }
          />
          <div className="air"></div>
          <button className="btn btn-lg btn-success pull-right" type="submit">
            Создать продажу <span className="glyphicon glyphicon-cloud-upload"></span>
          </button>
          <Link to="/deals" className="btn btn-lg btn-default pull-left">
            <span className="glyphicon glyphicon-arrow-left"></span> Отмена
          </Link>
        </form>
        <DealModal 
          stock={ props.stock.items }
          clients={ props.clients.items }
          modal={ props.modal }
          onSort={ ::this.onSortModal }
          onSearch={ ::this.searchModal }
          onClearSearch={ ::this.clearSearchModal }
          onAddItem={ ::this.addItem }
          onSetClient={ ::this.setClient }
          close={ ::this.closeModal }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    title: state.dealDetail.title,
    state: state.dealDetail.state,
    items: state.dealDetail.items,
    manager: state.dealDetail.manager,
    client: state.dealDetail.client,
    modal: state.dealDetail.modal,
    sum: state.dealDetail.sum,
    user: state.user,
    stock: state.stock,
    clients: state.clients
  }
)

const mapDispatchToProps = dispatch => (
  {
    setDealState:     bindActionCreators(Actions.setDealState, dispatch),
    setDealManager:   bindActionCreators(Actions.setDealManager, dispatch),
    showModal:        bindActionCreators(Actions.showModal, dispatch),
    sortModal:        bindActionCreators(Actions.sortModal, dispatch),
    searchModal:      bindActionCreators(Actions.searchModal, dispatch),
    addItem:          bindActionCreators(Actions.addItem, dispatch),
    removeItem:       bindActionCreators(Actions.removeItem, dispatch),
    setClient:        bindActionCreators(Actions.setClient, dispatch),
    setItemPrice:     bindActionCreators(Actions.setItemPrice, dispatch),
    setItemNumber:    bindActionCreators(Actions.setItemNumber, dispatch),
    setSum:           bindActionCreators(Actions.setSum, dispatch),
    getUsers:         bindActionCreators(getUsers, dispatch),
    getStock:         bindActionCreators(getStock, dispatch),
    getClients:       bindActionCreators(getClients, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deal)
