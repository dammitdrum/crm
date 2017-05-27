import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import Controls from './controls'
import Table from './table'
import DealModal from '../dealDetail/modal'
import * as dealsActions from '../../actions/dealsActions'
import * as dealDetailActions from '../../actions/dealDetailActions'
import Enum from '../../utils/Enum'

class Deals extends Component {
  filterByState(e) {
    if (e.currentTarget.className === 'active') return
    this.props.filterByState(e.currentTarget.getAttribute('data-state'))
  }
  filterBySearch(e) {
    this.props.filterBySearch(e.target.value)
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
  openDeal(e) {
    let id = e.currentTarget.getAttribute('data-id')
    hashHistory.push('/deals/edit/' + id)
  }
  openModal(e) {
    this.props.showModal({
      show: true,
      mode: 'clients',
      sortBy: { code: 'name', type: 'asc' },
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
  filterByClient(e) {
    let id = e.currentTarget.getAttribute('data-id')
    let client = _.find(this.props.clients, item => item._id === id)
    if (_.find(this.props.filterClients, client => client._id === id)) return
    this.props.filterByClient(client)
    this.closeModal()
  }
  clearClient(e) {
    let id = e.currentTarget.getAttribute('data-id')
    this.props.clearClient(id)
  }
  _filter(props) {
    let deals = []
    let states = []
    const userFilter = this.props.routeParams.login
    
    if (userFilter) {
      deals = _.filter(props.deals, deal => deal.manager.login === userFilter)
    } else {
      deals = props.deals
    }
    states = [Enum.defaultStateDeals].concat(
      _.uniqBy(deals, 'state').map((deal) => deal.state).sort()
    )
    if (props.activeState !== Enum.defaultStateDeals) {
      deals = _.filter(deals, deal => deal.state === props.activeState)
    } 
    if (props.filterClients.length) {
      let filteredDeals = []
      props.filterClients.forEach(client => {
        filteredDeals = filteredDeals.concat(_.filter(deals, deal => deal.client._id === client._id))
      })
      deals = filteredDeals
    }
    if (props.searchQuery) {
      deals = _.filter(
        deals, 
        deal => deal.number.toString().indexOf(props.searchQuery.trim()) !== -1
      )
    }
    deals = _.orderBy(deals, (deal) => (
      deal[props.sortBy.code]['name'] || deal[props.sortBy.code]
    ), [props.sortBy.type])

    return { states, deals }
  }
  render() {
    let props = this.props
    let filtered = this._filter(props)

    return (
      <div className='deals container'>
        <h2 className="main_title">{ props.title }</h2>
        <Controls 
          states={ filtered.states } 
          clickState={ ::this.filterByState }
          activeState={ props.activeState }
          clients={ props.filterClients }
          openModal={ ::this.openModal }
          clearClient={ ::this.clearClient }
          changeSearch={ ::this.filterBySearch }
          clearSearch={ ::this.clearSearch }
          query={ props.searchQuery }
        />
        <Table 
          data={ props }
          deals= { filtered.deals }
          onSort={ ::this.onSort }
          openDeal={ ::this.openDeal }
        />
        <DealModal 
          clients={ props.clients }
          modal={ props.modal }
          onSort={ ::this.onSortModal }
          onSearch={ ::this.searchModal }
          onClearSearch={ ::this.clearSearchModal }
          onSetClient={ ::this.filterByClient }
          close={ ::this.closeModal }
        />
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    title: state.deals.title,
    deals: state.deals.items,
    searchQuery: state.deals.searchQuery,
    filterClients: state.deals.filterClients,
    activeState: state.deals.activeState,
    sortBy: state.deals.sortBy,
    modal: state.dealDetail.modal,
    clients: state.clients.items
  }
)

const mapDispatchToProps = dispatch => (
  {
    filterByState:    bindActionCreators(dealsActions.filterByState, dispatch),
    filterByClient:   bindActionCreators(dealsActions.filterByClient, dispatch),
    clearClient:      bindActionCreators(dealsActions.clearClient, dispatch),
    filterBySearch:   bindActionCreators(dealsActions.filterBySearch, dispatch),
    sortData:         bindActionCreators(dealsActions.sortData, dispatch),
    showModal:        bindActionCreators(dealDetailActions.showModal, dispatch),
    sortModal:        bindActionCreators(dealDetailActions.sortModal, dispatch),
    searchModal:      bindActionCreators(dealDetailActions.searchModal, dispatch),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deals)
