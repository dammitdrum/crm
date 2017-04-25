import React, { Component } from 'react'

class Table extends Component {

	render() {
		let props = this.props
		return (
			<table className='stock_table deals table table-striped table-bordered'>
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
				<tbody>
					{
						props.items.map((item, i) =>
				      <tr key={ i } data-id={ item._id }>
				      	<td>{ i + 1 }</td>
				      	<td>{ item.art }</td>
				      	<td>{ item.name }</td>
				      	<td>$&nbsp; 
				      		<input 
				      			type='number' 
				      			name="price" 
				      			className='quant_input' 
				      			pattern="/^\d+$/"
				      			value={ item.price }
				      			onChange={ props.setPrice }
				      			required/>
				      	</td>
				      	<td>{ item.quantity }</td>
				      	<td>{ item.debt }</td>
				      	<td>{ item.ordered }</td>
				      	<td>
				      		<input 
				      			type='number' 
				      			name="quantity" 
				      			className='quant_input' 
				      			pattern="/^\d+$/"
				      			value={ item.number }
				      			onChange={ props.setNumber }
				      			required/>
				      		<span 
				      			className="btn btn-danger btn-sm pull-right remove_butt"
				      			onClick={ props.removeItem }>
			            	<span className="glyphicon glyphicon-remove"></span>
			          	</span>
				      	</td>
				      </tr>
				    )
					}
					{
						props.items.length ?
						<tr className="bg_w">
              <td colSpan="7" className="tar"><strong>Общая сумма:</strong></td>
              <td><strong>$ { props.sum }</strong></td>
            </tr>
            : null
					}
					<tr className="not_hover">
	        	<td colSpan="8" className="text-center">
	        	<span className="btn btn-default" onClick={ props.openModal } data-modal='stock'>
							Добавить товар <span className="glyphicon glyphicon-plus"></span>
						</span>
	          </td>
	        </tr>
				</tbody>
			</table>
		)
	}
} 

export default Table
