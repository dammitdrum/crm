import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { getMenuData } from '../actions/headerActions'

class Header extends Component {
  
  componentWillMount() {
    if (!this.props.menu.links.length) {
      this.props.getMenu()
    } 
  }

  render() {
    let props = this.props
    let links = props.menu.links

    return (
    	<nav className="navbar navbar-default navbar-static-top">
  		 	<div className="container">
  			    <ul className="nav navbar-nav" >
              { 
                links.map((link,i) =>
                  <li key={ i }>
                    <Link to={ link.path } activeClassName='active'>{ link.text }</Link>
                  </li>
                )  
              }
            </ul>
            <ul className="nav navbar-nav navbar-right" >
              <li className="divider">
                <Link to={`/deals/user/${props.user.login}`} activeClassName='active'>Мои сделки</Link>
              </li>
              <li>
                <Link to='/user' activeClassName='active'>{ props.user.name }</Link>
              </li>
            </ul>
  		 	</div>
  		</nav>
    )
  }
}

const mapStateToProps = state => (
  {
    menu: state.header.menu,
    user: state.user
  }
)

const mapDispatchToProps = dispatch => (
	{
    getMenu: bindActionCreators(getMenuData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
