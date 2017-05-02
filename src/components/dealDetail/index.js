import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, hashHistory } from 'react-router'

import Controls from './controls'
import Table from './table'
import DealModal from './modal'
import * as Actions from '../../actions/dealDetailActions'
import { createDeal, saveDeal } from '../../actions/dealsActions'

class Deal extends Component {
	componentWillMount() {
    let dealNumber = this.props.routeParams.id, deal
    if (dealNumber) {
      deal = _.cloneDeep(_.find(this.props.deals.items, deal => deal.number === +dealNumber))
      let stock = this.props.stock.items
      deal.items = deal.items.map(dealItem => {
        return Object.assign({}, 
          _.find(stock, item => item._id === dealItem.id), 
          { price: dealItem.price, number: dealItem.number }
        )
      })
    }
    this.props.loadDeal(deal ? deal : null)
    this.props.setDealManager(deal ? deal.manager : this.props.user)
  }
  componentDidUpdate() {
    if (this.props.redirect) {
      hashHistory.push('/deals')
    }
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
    this.props.setDealSum()
  }
  removeItem(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.removeItem(id)
    this.props.setDealSum()
  }
  setDealClient(e) {
    this.props.setDealClient(this._findItem(this.props.clients.items, e))
  }
  setItemPrice(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.setItemPrice(e.target.value, id)
    this.props.setDealSum()
  }
  setItemNumber(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.setItemNumber(e.target.value, id)
    this.props.setDealSum()
  }
  setDealNumber(e) {
    this.props.setDealNumber(e.target.value)
  }
  submitDeal(e) {
    let deal = _.cloneDeep(this.props.dealDetail)
    deal.items = deal.items.map(item => {
      return {
        id: item._id,
        number: item.number,
        price: item.price,
      }
    })
    if (this.props.routeParams.id) {
      this.props.saveDeal(deal)
    } else {
      this.props.createDeal(deal)
    }
  }
  render() {
    let props = this.props
    let id = props.routeParams.id
    let btnInfo = {
      cssClass: id ? 'btn-warning' : 'btn-success',
      text: id ? 'Сохранить сделку' : 'Создать сделку'
    }

    return (
      <div className='deal_detail container'>
        <h3>{ props.title }</h3>
        <hr/>
        <div className='modal_form clearfix'>
          <Controls 
            dealState={ props.state }
            clickStateBtn={ ::this.setDealState }
            managerList={ props.user.users }
            manager={ props.manager }
            client={ props.client }
            selectManager={ ::this.setDealManager }
            openModal={ ::this.openModal }
            number={ props.number }
            changeNumber={ ::this.setDealNumber }
          />
          <div className='air'></div>
          <Table 
            items={ props.items }
            openModal={ ::this.openModal }
            removeItem={ ::this.removeItem }
            setPrice={ ::this.setItemPrice }
            setNumber={ ::this.setItemNumber }
            sum={ props.sum }
          />
          <div className='air'></div>
          <button className={'btn btn-lg pull-right ' + btnInfo.cssClass} onClick={ ::this.submitDeal }>
            { btnInfo.text } <span className='glyphicon glyphicon-cloud-upload'></span>
          </button>
          <Link to='/deals' className='btn btn-lg btn-default pull-left'>
            <span className='glyphicon glyphicon-arrow-left'></span> Отмена
          </Link>
        </div>
        <DealModal 
          stock={ props.stock.items }
          clients={ props.clients.items }
          modal={ props.modal }
          onSort={ ::this.onSortModal }
          onSearch={ ::this.searchModal }
          onClearSearch={ ::this.clearSearchModal }
          onAddItem={ ::this.addItem }
          onSetClient={ ::this.setDealClient }
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
    reCalculate: state.dealDetail.reCalculate,
    sum: state.dealDetail.sum,
    number: state.dealDetail.number,
    redirect: state.dealDetail.redirect,
    dealDetail: state.dealDetail,
    user: state.user,
    stock: state.stock,
    deals: state.deals,
    clients: state.clients
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadDeal:         bindActionCreators(Actions.loadDeal, dispatch),
    setDealState:     bindActionCreators(Actions.setDealState, dispatch),
    setDealManager:   bindActionCreators(Actions.setDealManager, dispatch),
    showModal:        bindActionCreators(Actions.showModal, dispatch),
    sortModal:        bindActionCreators(Actions.sortModal, dispatch),
    searchModal:      bindActionCreators(Actions.searchModal, dispatch),
    addItem:          bindActionCreators(Actions.addItem, dispatch),
    removeItem:       bindActionCreators(Actions.removeItem, dispatch),
    setDealClient:    bindActionCreators(Actions.setDealClient, dispatch),
    setItemPrice:     bindActionCreators(Actions.setItemPrice, dispatch),
    setItemNumber:    bindActionCreators(Actions.setItemNumber, dispatch),
    setDealNumber:    bindActionCreators(Actions.setDealNumber, dispatch),
    setDealSum:       bindActionCreators(Actions.setDealSum, dispatch),
    createDeal:       bindActionCreators(createDeal, dispatch),
    saveDeal:         bindActionCreators(saveDeal, dispatch),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deal)
