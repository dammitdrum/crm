import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
	
	render() {
		let data = this.props.menu
		return (
			<ul className="nav navbar-nav" >
				{
					data.loading ?
					<li><p>loading...</p></li>
					:
					data.links.map((link,i) =>
			      <li key={ i } className={ link.active ? 'active' : '' }>
			        <Link onClick={ ::this.linkClick } to={ link.path }>{ link.text }</Link>
			      </li>
			    )				
				}
			</ul>
		)
	}
} 

export default Menu
