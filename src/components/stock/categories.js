import React, { Component } from 'react'

class Categories extends Component {
	render() {
		let cats = this.props.categories
		
		return (
			<ul className='nav nav-pills stock_filters'>
				<li><a>Все товары</a></li>
				{
					cats.map((item, i) =>
			      <li key={ i }>
			      	<a>{ item }</a>
			      </li>
			    )	
				}
			</ul>
		)
	}
} 

export default Categories
