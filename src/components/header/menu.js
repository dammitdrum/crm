import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
	render() {
		let data = this.props.menu, list

		if (data.loading) {
			list = <li><strong>loading...</strong></li>
		}
		if (data.error) {
			list = <li><strong>Ops...</strong></li>
		}
		if (data.links) {
			list = data.links.map((link,i) =>
	      <li key={ i } className={ link.active ? 'active' : '' }>
	        <Link to={ link.path }>{ link.text }</Link>
	      </li>
	    )		
		}
		return (
			<ul className="nav navbar-nav" >
				{list}
			</ul>
		)
	}
} 

export default Menu
