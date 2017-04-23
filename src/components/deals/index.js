import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Controls from './controls'
import Table from './table'
import * as Actions from '../../actions/dealsActions'
import Enum from '../../utils/Enum'

class Deals extends Component {
	componentWillMount() {
    if (!this.props.loaded) {
      this.props.getData()
    } 
  }
  clickState(e) {
    if (e.currentTarget.className === 'active') return
    this.props.filterByState(e.currentTarget.getAttribute('data-state'))
  }
  changeSearch(e) {
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
  render() {
    let data = this.props
    let content
    let deals = []
    let states = []

    if (data.loading) {
      content = <h3 className='text-center'><strong>loading...</strong></h3>
    }

    if (data.error) {
      content = <h3 className='text-center'><strong>Ops...</strong></h3>
    }

    // data fetched
    if (data.loaded) {
      deals = data.deals
      states = [Enum.defaultStateDeals].concat(
        _.uniqBy(data.deals, 'state').map((deal) => deal.state).sort()
      )
      if (data.activeState !== Enum.defaultStateDeals) {
        deals = _.filter(
          data.deals, 
          deal => deal.state === data.activeState
        )
      } else {
        deals = data.deals
      }
      if (data.searchQuery) {
        deals = _.filter(
          deals, 
          deal => deal.number.toString().indexOf(data.searchQuery.trim()) !== -1
        )
      }
      deals = _.orderBy(deals, (deal) => (
        deal[data.sortBy.code]['name'] || deal[data.sortBy.code]
      ), [data.sortBy.type])
      content = (
        <div>
          <Controls 
            states={ states } 
            clickState={ ::this.clickState }
            activeState={ data.activeState }
            changeSearch={ ::this.changeSearch }
            clearSearch={ ::this.clearSearch }
            query={ data.searchQuery }
          />
          <Table 
            data={ data }
            deals= { deals }
            onSort={ ::this.onSort }
          />
        </div>
      )
    }
    return (
      <div className='deals container'>
        <h2 className="main_title">{ data.title }</h2>
        { content }
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    title: state.deals.title,
    deals: state.deals.deals,
    searchQuery: state.deals.searchQuery,
    activeState: state.deals.activeState,
    loaded: state.deals.loaded,
    loading: state.deals.loading,
    error: state.deals.error,
    sortBy: state.deals.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    getData:          bindActionCreators(Actions.getData, dispatch),
    filterByState: bindActionCreators(Actions.filterByState, dispatch),
    filterBySearch:   bindActionCreators(Actions.filterBySearch, dispatch),
    sortData:         bindActionCreators(Actions.sortData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deals)
