import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

    props.profile.active = props.profile.path === props.path ? true : false

    if (links && links.length) {
      links.forEach(link => {
        link.active = false
        if (link.path === props.path) {
          link.active = true
        }
      }) 
    }

    return (
    	<nav className="navbar navbar-default navbar-static-top">
  		 	<div className="container">
  			    <ul className="nav navbar-nav" >
              { 
                links.map((link,i) =>
                  <li key={ i } className={ link.active ? 'active' : '' }>
                    <a href={ '#' + link.path }>{ link.text }</a>
                  </li>
                )  
              }
            </ul>
            <ul className="nav navbar-nav navbar-right" > 
              <li className={ props.profile.active ? 'active' : '' }>
                <a href={ '#' + props.profile.path }>{ props.profile.text }</a>
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
    profile: state.header.profile,
    path: state.header.path
  }
)

const mapDispatchToProps = dispatch => (
	{
    getMenu: bindActionCreators(getMenuData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
