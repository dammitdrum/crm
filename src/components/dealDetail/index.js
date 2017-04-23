import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Controls from './controls'
import Table from './table'
import * as Actions from '../../actions/dealDetailActions'

class Deal extends Component {
	componentWillMount() {
    if (!this.props.users) {
      this.props.getUsers()
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
          />
          <div className="air"></div>
          <Table 
            items={ props.items }
          />
          <div className="air"></div>
          <button className="btn btn-lg btn-success pull-right" type="submit">
            Создать продажу <span className="glyphicon glyphicon-cloud-upload"></span>
          </button>
          <Link to="/deals" className="btn btn-lg btn-default pull-left">
            <span className="glyphicon glyphicon-arrow-left"></span> Отмена
          </Link>
        </form>
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
    user: state.user
  }
)

const mapDispatchToProps = dispatch => (
  {
    setDealState: bindActionCreators(Actions.setDealState, dispatch),
    setDealManager: bindActionCreators(Actions.setDealManager, dispatch),
    setDealManagerDefault: bindActionCreators(Actions.setDealManagerDefault, dispatch),
    getUsers: bindActionCreators(Actions.getUsers, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deal)
