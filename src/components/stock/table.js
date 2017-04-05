import React, { Component } from 'react'

class Table extends Component {
	render() {
		let items = this.props.items, list

		if (!items.length) {
			list = <tr><td colspan="7" className="text-center"><strong>Ничего нет</strong></td></tr>

		} else {
			list = items.map((item, i) =>
	      <tr key={ i }>
	      	<td>{ i }</td>
	      	<td>{ item.art }</td>
	      	<td>{ item.name }</td>
	      	<td>$ { item.price }</td>
	      	<td>{ item.quantity }</td>
	      	<td>{ item.debt }</td>
	      	<td>{ item.ordered }</td>
	      </tr>
	    )	
		}
		
		return (
			<table className='stock_table table table-hover table-striped table-bordered'>
				<thead>
					<th>#<span className="caret"></span></th>
					<th className="pointer">Артикул<span className="caret"></span></th>
					<th className="pointer">Наименование<span className="caret"></span></th>
					<th className="pointer">Цена<span className="caret"></span></th>
					<th className="pointer">Наличие<span className="caret"></span></th>
					<th className="pointer">Обязательства<span className="caret"></span></th>
					<th className="pointer">Заказано<span className="caret"></span></th>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
