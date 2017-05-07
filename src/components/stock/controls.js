import React, { Component } from 'react'

class Controls extends Component {
	render() {
		let props = this.props
		
		return (
			<div className="controls">
				<ul className='nav nav-pills stock_filters'>
					{
						props.categories.map((item, i) =>
				      <li key={ i } 
				      	onClick={ props.clickCategory } 
				      	className={ props.activeCategory === item ? 'active' : '' }>
				      	<a>{ item }</a>
				      </li>
				    )	
					}
				</ul>
				<span className="search_wrap">
				  <input type="text" 
				    placeholder="Искать по названию" 
				    className="search_field"
				    onChange={ props.changeSearch }
				    value={ props.query }
				  />
				  {
				  	props.query.length ?
				  	<span className="clear_search" onClick={ props.clearSearch }>×</span> : ''
				  }
			  </span>
			  {
			  	props.access < 120 ?
			  	<button className="btn btn-default add_butt pull-right" onClick={ props.openModal }>
				    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Создать товар
				  </button> 
				  : null
			  }
			  
			</div>
		)
	}
} 

export default Controls
