import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, hashHistory } from 'react-router'
import { Overlay, Popover } from 'react-bootstrap'
import Validator from '../../utils/validator'
import calculator from '../../utils/calculator'
import validateConfig from '../../config/validate/deal'
import accessConfig from '../../config/access/dealDetail'
import Controls from './controls'
import Table from './table'
import DealModal from './modal'
import * as dealDetailActions from '../../actions/dealDetailActions'
import { createDeal, saveDeal, deleteDeal } from '../../actions/dealsActions'
import { updateItem } from '../../actions/stockActions'

class Deal extends Component {
	componentWillMount() {
    const dealNumber = this.props.routeParams.id
    let dealData
    this.validator = new Validator(this.props.validate, validateConfig)
    if (dealNumber) {
      this.originalDeal = _.find(this.props.deals.items, deal => deal.number === +dealNumber)
      dealData = _.cloneDeep(this.originalDeal)
      let stock = this.props.stock.items
      dealData.items = dealData.items.map(dealItem => {
        return Object.assign({}, 
          _.find(stock, item => item._id === dealItem.id), 
          { price: dealItem.price, number: dealItem.number }
        )
      })
    }
    this.props.loadDeal(dealData ? dealData : null)
    this.props.setDealManager(dealData ? dealData.manager : {
      login: this.props.user.login,
      name: this.props.user.name
    })
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
    this.props.setDealManager({
      login: manager.login,
      name: manager.name
    })
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
  addItem(e) {
    let id = e.currentTarget.getAttribute('data-id')
    let item = _.find(_.cloneDeep(this.props.stock.items), item => item._id === id)
    let addedItem = _.find(this.props.items, i => i._id === item._id)
    if (addedItem) {
      let number = addedItem.number
      let id = addedItem._id
      if (item.quantity != number) ++number
      this.props.setItemNumber(number, id)
    } else {
      item.number = 1
      this.props.addItem(item)
    }
    this.closeModal()
    this.props.setDealSum()
  }
  removeItem(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.removeItem(id)
    this.props.setDealSum()
  }
  setDealClient(e) {
    let id = e.currentTarget.getAttribute('data-id')
    let client = _.find(this.props.clients.items, item => item._id === id)
    this.props.setDealClient(client)
    this.closeModal()
    this.validator.validate({client: client})
  }
  setItemPrice(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    this.props.setItemPrice(e.target.value, id)
    this.props.setDealSum()
  }
  setItemNumber(e) {
    let id = e.currentTarget.closest('[data-id]').getAttribute('data-id')
    let item = _.find(this.props.stock.items, item => item._id === id)
    this.props.setItemNumber(e.target.value > 0 ? e.target.value : 0, id)
    this.props.setDealSum()
  }
  setDealNumber(e) {
    this.props.setDealNumber(e.target.value)
    this.validator.validate({number: e.target.value})
  }
  submitDeal() {
    if (!this.validator.validate({number: this.props.number, client: this.props.client})) return
    calculator(
      this.props.dealDetail, 
      this.originalDeal, 
      this.props.stock.items, 
      this.props.updateStockItem
    )
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
  deleteDeal() {
    this.props.deleteDeal(this.originalDeal._id)
  }
  _getAccess(access) {
    let k = 1
    let state = this.originalDeal ? this.originalDeal.state : 'new'
    switch (state) {
      case 'approved':
        k = 2
        break
      case 'closed':
        k = 3
        break
      case 'canceled':
        k = 4
        break
    }
    if (access === 120) {
      if (this.originalDeal && this.originalDeal.manager.login !== this.props.user.login) {
        access = 500
      }
    }
    return access * k
  }
  render() {
    let props = this.props
    let id = props.routeParams.id
    let title = id ? `Редактирование сделки №${id}` : 'Создание новой сделки'
    let btnInfo = {
      cssClass: id ? 'btn-warning' : 'btn-success',
      text: id ? 'Сохранить сделку' : 'Создать сделку'
    }
    let access = accessConfig[props.user.access]
    let accessComponent = this._getAccess(access.component)
    
    return (
      <div className='deal_detail container'>
        <h3>{ title }</h3>
        <hr/>
        <div className='modal_form clearfix'>
          <Controls 
            access={ this._getAccess(access.controls) }
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
            access={ this._getAccess(access.table) }
            items={ props.items }
            openModal={ ::this.openModal }
            removeItem={ ::this.removeItem }
            setPrice={ ::this.setItemPrice }
            setNumber={ ::this.setItemNumber }
            sum={ props.sum }
          />
          <div className='air'></div>
          {
            accessComponent === 400 ?
            <button className={'btn btn-lg pull-right btn-danger'} onClick={ ::this.deleteDeal }>
            Удалить сделку <span className='glyphicon glyphicon-trash'></span>
            </button>
            : accessComponent < 330 ?
            <button className={'btn btn-lg pull-right ' + btnInfo.cssClass} onClick={ ::this.submitDeal }>
            { btnInfo.text } <span className='glyphicon glyphicon-cloud-upload'></span>
            </button> : null
          }
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
    validateMess: state.dealDetail.validateMess,
    dealDetail: state.dealDetail,
    user: state.user,
    stock: state.stock,
    deals: state.deals,
    clients: state.clients
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadDeal:         bindActionCreators(dealDetailActions.loadDeal, dispatch),
    setDealState:     bindActionCreators(dealDetailActions.setDealState, dispatch),
    setDealManager:   bindActionCreators(dealDetailActions.setDealManager, dispatch),
    showModal:        bindActionCreators(dealDetailActions.showModal, dispatch),
    sortModal:        bindActionCreators(dealDetailActions.sortModal, dispatch),
    searchModal:      bindActionCreators(dealDetailActions.searchModal, dispatch),
    addItem:          bindActionCreators(dealDetailActions.addItem, dispatch),
    removeItem:       bindActionCreators(dealDetailActions.removeItem, dispatch),
    setDealClient:    bindActionCreators(dealDetailActions.setDealClient, dispatch),
    setItemPrice:     bindActionCreators(dealDetailActions.setItemPrice, dispatch),
    setItemNumber:    bindActionCreators(dealDetailActions.setItemNumber, dispatch),
    setDealNumber:    bindActionCreators(dealDetailActions.setDealNumber, dispatch),
    setDealSum:       bindActionCreators(dealDetailActions.setDealSum, dispatch),
    validate:         bindActionCreators(dealDetailActions.validate, dispatch),
    createDeal:       bindActionCreators(createDeal, dispatch),
    saveDeal:         bindActionCreators(saveDeal, dispatch),
    deleteDeal:       bindActionCreators(deleteDeal, dispatch),
    updateStockItem:  bindActionCreators(updateItem, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deal)
