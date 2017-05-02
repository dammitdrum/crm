import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import Controls from './controls'
import Table from './table'
import * as Actions from '../../actions/dealsActions'
import Enum from '../../utils/Enum'

class Deals extends Component {
	componentWillMount() {
    
  }
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
  render() {
    let props = this.props
    let deals = []
    let states = []

    deals = props.deals
    states = [Enum.defaultStateDeals].concat(
      _.uniqBy(props.deals, 'state').map((deal) => deal.state).sort()
    )
    if (props.activeState !== Enum.defaultStateDeals) {
      deals = _.filter(
        props.deals, 
        deal => deal.state === props.activeState
      )
    } else {
      deals = props.deals
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

    return (
      <div className='deals container'>
        <h2 className="main_title">{ props.title }</h2>
        <Controls 
          states={ states } 
          clickState={ ::this.filterByState }
          activeState={ props.activeState }
          changeSearch={ ::this.filterBySearch }
          clearSearch={ ::this.clearSearch }
          query={ props.searchQuery }
        />
        <Table 
          data={ props }
          deals= { deals }
          onSort={ ::this.onSort }
          openDeal={ ::this.openDeal }
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
    activeState: state.deals.activeState,
    sortBy: state.deals.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    filterByState:    bindActionCreators(Actions.filterByState, dispatch),
    filterBySearch:   bindActionCreators(Actions.filterBySearch, dispatch),
    sortData:         bindActionCreators(Actions.sortData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deals)
