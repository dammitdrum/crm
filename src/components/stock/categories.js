import React, { Component } from 'react'

class Categories extends Component {
	render() {
		let cats = this.props.categories
		let handler = this.props.handler
		
		return (
			<ul className='nav nav-pills stock_filters'>
				{
					cats.map((item, i) =>
			      <li key={ i } 
			      	onClick={ handler } 
			      	className={ this.props.active === item ? 'active' : '' }>
			      	<a>{ item }</a>
			      </li>
			    )	
				}
			</ul>
		)
	}
} 

export default Categories
