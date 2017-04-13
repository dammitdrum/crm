import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header'
import Controls from '../components/deals/controls'
import Table from '../components/deals/table'
import * as Actions from '../actions/dealsActions'
import Enum from '../Enum'

class Deals extends Component {
	constructor(props) {
    super(props)
    if (!props.loaded) {
      props.getData()
    } 
  }
  clickCategory(e) {
    if (e.target.closest('.active')) return
    this.props.filterByCategory(e.target.innerText)
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
    let items = []
    let categories = []

    if (data.loading) {
      content = <h3 className='text-center'><strong>loading...</strong></h3>
    }

    if (data.error) {
      content = <h3 className='text-center'><strong>Ops...</strong></h3>
    }

    // data not empty
    if (data.loaded) {
      categories = [Enum.defaultCatStock].concat(
        _.uniqBy(data.items, 'category').map((item) => item.category).sort()
      )
      if (data.activeCategory !== Enum.defaultCatStock) {
        items = _.filter(
          data.items, 
          item => item.category === data.activeCategory
        )
      } else {
        items = data.items
      }
      if (data.searchQuery) {
        items = _.filter(
          items, 
          item => item.name.toLowerCase().indexOf(data.searchQuery.trim()) !== -1
        )
      }
      items = _.orderBy(items, [data.sortBy.code], [data.sortBy.type])
      content = (
        <div>
          <Controls 
            categories={ categories } 
            clickCategory={ ::this.clickCategory }
            activeCategory={ data.activeCategory }
            changeSearch={ ::this.changeSearch }
            clearSearch={ ::this.clearSearch }
            query={ data.searchQuery }
          />
          <Table 
            data={ data }
            items= { items }
            onSort={ ::this.onSort }
          />
        </div>
      )
    }
    return (
      <div>
        <Header/>
        <div className='deals container'>
          <h2 className="main_title">{ data.title }</h2>
          { content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    title: state.deals.title,
    items: state.deals.items,
    searchQuery: state.deals.searchQuery,
    activeCategory: state.deals.activeCategory,
    loaded: state.deals.loaded,
    loading: state.deals.loading,
    sortBy: state.deals.sortBy
  }
)

const mapDispatchToProps = dispatch => (
  {
    getData:          bindActionCreators(Actions.getData, dispatch),
    filterByCategory: bindActionCreators(Actions.filterByCategory, dispatch),
    filterBySearch:   bindActionCreators(Actions.filterBySearch, dispatch),
    sortData:         bindActionCreators(Actions.sortData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deals)
