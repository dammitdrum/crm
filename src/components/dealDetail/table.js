import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

class Table extends Component {

	render() {
		const props = this.props
		const tooltip = (
			<Tooltip id="tooltip">Необходимо перевести сделку в статус "Новая"</Tooltip>
		)

		return (
			<table className='stock_table deals table table-striped table-bordered'>
				<thead>
					<tr>
						<th>#</th>
						<th>Артикул</th>
						<th>Наименование</th>
						<th>Цена</th>
						<th>Наличие</th>
						<th>Обязательства</th>
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
				      	{
				      		props.access < 330 ?
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
					      	:
					      	<td>$ { item.price }</td>
				      	}
				      	
				      	<td>{ item.quantity }</td>
				      	<td>{ item.debt }</td>
				      	<td>{ item.ordered }</td>
				      	{
				      		props.access < 330 ?
				      		<td>
					      		{
					      			props.access < 130 ?
					      			<div>
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
						          </div>
					          	: 
					          	<OverlayTrigger placement="top" overlay={ tooltip }>
						          	<div>
							          	<input 
							          		className='quant_input' 
							          		value={ item.number }
								      			required disabled/>
										      <span 
								      			className="btn btn-danger btn-sm pull-right remove_butt disabled">
							            	<span className="glyphicon glyphicon-remove"></span>
							          	</span>
							          </div>
									    </OverlayTrigger>
									   	
					      		}
					      	</td>
					      	:
					      	<td>{ item.number }</td>
				      	}
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
					{
	       		props.access < 330 ?
	       		<tr className="not_hover">
		        	<td colSpan="8" className="text-center">
		        		{
		        			props.access < 130 ?
		        			<span className="btn btn-default" onClick={ props.openModal } data-modal='stock'>
										Добавить товар <span className="glyphicon glyphicon-plus"></span>
									</span>
									:
									<OverlayTrigger placement="top" overlay={ tooltip }>
				          	<span className="btn btn-default disabled">
											Добавить товар <span className="glyphicon glyphicon-plus"></span>
										</span>
			          	</OverlayTrigger>
		        		}
		        		
		          </td>
		        </tr>
		        : null
	        }
				</tbody>
			</table>
		)
	}
} 

export default Table
