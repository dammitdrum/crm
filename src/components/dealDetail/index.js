import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Controls from './controls'
import Table from './table'
import DealModal from './modal'
import * as Actions from '../../actions/dealDetailActions'
import { getData as getStock} from '../../actions/stockActions'
import { getData as getClients} from '../../actions/clientsActions'

class Deal extends Component {
	componentWillMount() {
    if (!this.props.users) {
      this.props.getUsers()
    }
    if (!this.props.stock.loaded) {
      this.props.getStock()
    }
    if (!this.props.clients.loaded) {
      this.props.getClients()
    }
    this.props.setDealState('new')
    this.props.setDealManagerDefault(this.props.user)
  }
  setDealState(e) {
    if (e.currentTarget.classList.contains('active')) return
    this.props.setDealState(e.currentTarget.getAttribute('data-state'))
  }
  setDealManager(e) {
    this.props.setDealManager(e.currentTarget.getAttribute('data-id'))
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
  render() {
    let props = this.props
    
    return (
      <div className='deal_detail container'>
        <h3>{ props.title }</h3>
        <hr/>
        <form name="form" className="modal_form clearfix">
          <Controls 
            currentState={ props.state }
            clickStateBtn={ ::this.setDealState }
            managers={ props.users }
            currentManager={ props.manager }
            selectManager={ ::this.setDealManager }
            openModal={ ::this.openModal }
          />
          <div className="air"></div>
          <Table 
            items={ props.items }
            openModal={ ::this.openModal }
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
          stock={ props.stock }
          clients={ props.clients }
          modal={ props.modal }
          onSort={ ::this.onSortModal }
          onSearch={ ::this.searchModal }
          onClearSearch={ ::this.clearSearchModal }
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
    users: state.dealDetail.users,
    manager: state.dealDetail.manager,
    modal: state.dealDetail.modal,
    stock: state.stock.items,
    clients: state.clients.items,
    user: state.user
  }
)

const mapDispatchToProps = dispatch => (
  {
    setDealState: bindActionCreators(Actions.setDealState, dispatch),
    setDealManager: bindActionCreators(Actions.setDealManager, dispatch),
    setDealManagerDefault: bindActionCreators(Actions.setDealManagerDefault, dispatch),
    showModal: bindActionCreators(Actions.showModal, dispatch),
    sortModal: bindActionCreators(Actions.sortModal, dispatch),
    searchModal: bindActionCreators(Actions.searchModal, dispatch),
    getUsers: bindActionCreators(Actions.getUsers, dispatch),
    getStock: bindActionCreators(getStock, dispatch),
    getClients: bindActionCreators(getClients, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deal)
