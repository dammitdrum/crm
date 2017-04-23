import React, { Component } from 'react'
import Enum from '../../utils/Enum'
import { Link } from 'react-router'

class Controls extends Component {
	getInfoByState(state) {
		switch (state) {
			case Enum.defaultStateDeals:
				return { text: Enum.defaultStateDeals, cssClass: 'glyphicon-list' }
			case 'new':
				return { text: 'Новые', cssClass: 'glyphicon-leaf' }
			case 'approved':
				return { text: 'Подтвержденные', cssClass: 'glyphicon-ok' }
			case 'closed':
				return { text: 'Завершенные', cssClass: 'glyphicon-lock' }
			case 'canceled':
				return { text: 'Отмененные', cssClass: 'glyphicon-remove' }
		}
	}
	render() {
		let props = this.props
		
		return (
			<div className="controls">
				<ul className='nav nav-pills stock_filters'>
					{
						props.states.map((state, i) =>
				      <li key={ i } 
				      	onClick={ props.clickState } 
				      	className={ props.activeState === state ? 'active' : '' }
				      	data-state={ state }>
				      	<a>
				      		{ this.getInfoByState(state).text } <span className={ 'glyphicon ' + this.getInfoByState(state).cssClass }></span>
				      	</a>
				      </li>
				    )	
					}
				</ul>
				<span className="search_wrap">
				  <input type="text" 
				    placeholder="Искать по номеру" 
				    className="search_field"
				    onChange={ props.changeSearch }
				    value={ props.query }
				  />
				  {
				  	props.query.length ?
				  	<span className="clear_search" onClick={ props.clearSearch }>×</span> : ''
				  }
			  </span>
			  <Link to='/deals/create' className='btn btn-success add_butt pull-right'>
			  	<span className="glyphicon glyphicon-plus"></span> Новая сделка
			  </Link>
			</div>
		)
	}
} 

export default Controls
