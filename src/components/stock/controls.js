import React, { Component } from 'react'

class Categories extends Component {
	render() {
		let cats = this.props.categories
		
		return (
			<div className="controls">
				<ul className='nav nav-pills stock_filters'>
					{
						cats.map((item, i) =>
				      <li key={ i } 
				      	onClick={ this.props.categoryHandler } 
				      	className={ this.props.activeCategory === item ? 'active' : '' }>
				      	<a>{ item }</a>
				      </li>
				    )	
					}
				</ul>
			  <input type="text" 
			    placeholder="Искать по названию" 
			    className="search_field"
			    onChange={ this.props.inputHandler }
			    value={ this.props.query }
			  />
			  <button className="btn btn-default add_butt pull-right" onClick={ this.props.openModal }>
			    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Создать товар
			  </button>
			</div>
		)
	}
} 

export default Categories
