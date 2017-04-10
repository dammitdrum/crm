import React, { Component } from 'react'

class Table extends Component {
	constructor(props) {
		super(props)
		this.headInfo =[
      { text: 'Артикул', code: 'art'},
      { text: 'Наименование', code: 'name'},
      { text: 'Цена', code: 'price'},
      { text: 'Наличие', code: 'quantity'},
      { text: 'Обязательства', code: 'debt'},
      { text: 'Заказано', code: 'ordered'}
    ]
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.items.length) {
			list = (
				<tr>
					<td colSpan="7" className="text-center">
						<strong>Ничего нет
							{ data.searchQuery ? ' по запросу "' + data.searchQuery.trim() + '" в категории ' + data.activeCategory : ''}
						</strong>
					</td>
				</tr>
			)
		} else {
			list = props.items.map((item, i) =>
	      <tr key={ i }>
	      	<td>{ i + 1 }</td>
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
					<tr className={ data.sortBy.type === 'asc' ? '' : 'dropup'} >
						<th>#<span className="caret"></span></th>
						{
							this.headInfo.map((item, i) => 
								<th key={ i } 
									className="pointer" 
									data-sort={ item.code } 
									onClick={ props.clickSort }
									title={'Сортировать по "' + item.text + '"'}>
									{ item.text }
									<span className={ data.sortBy.code === item.code ? 'caret visible' : 'caret'}></span>
								</th>
							)
						}
					</tr>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
