import React, { Component } from 'react'

class Table extends Component {
	constructor(props) {
		super(props)
		
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.items.length) {
			list = (
				<tr className="not_hover">
        	<td colSpan="8" className="text-center">
        	<span className="btn btn-default">
						Добавить товар <span className="glyphicon glyphicon-plus"></span>
					</span>
          </td>
        </tr>
			)
		} else {
			list = props.items.map((item, i) =>
	      <tr key={ i }>
	      	<td>{ i + 1 }</td>
	      	<td>{ item.art }</td>
	      	<td>{ item.name }</td>
	      	<td>$ <input type='text' name="price" className='quant_input' pattern="/^\d+$/" required/></td>
	      	<td>{ item.quantity }</td>
	      	<td>{ item.debt }</td>
	      	<td>{ item.ordered }</td>
	      	<td>
	      		<input type='text' name="quantity" className='quant_input' pattern="/^\d+$/" required/>
	      		<span className="btn btn-danger btn-sm pull-right remove_butt">
            	<span className="glyphicon glyphicon-remove"></span>
          	</span>
	      	</td>
	      </tr>
	    )	
		}
		return (
			<table className='stock_table table table-hover table-striped table-bordered'>
				<thead>
					<tr>
						<th>#</th>
						<th>Артикул</th>
						<th>Наименование</th>
						<th>Цена</th>
						<th>Наличие</th>
						<th>Резерв</th>
						<th>Заказано</th>
						<th>Кол-во</th>
					</tr>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
