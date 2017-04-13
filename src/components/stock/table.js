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
	getItemClass(item) {
		if (item.deleting) {
			return 'deleting'
		}
		if (item.creating) {
			return 'creating'
		}
		if (item.updating) {
			return 'updating'
		}
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.items.length) {
			list = (
				<tr>
					<td colSpan="8" className="text-center">
						<strong>Ничего нет
							{ data.searchQuery ? ' по запросу "' + data.searchQuery.trim() + '" в категории ' + data.activeCategory : ''}
						</strong>
					</td>
				</tr>
			)
		} else {
			list = props.items.map((item, i) =>
	      <tr key={ i } className={ this.getItemClass(item) }>
	      	<td>{ i + 1 }</td>
	      	<td>{ item.art }</td>
	      	<td>{ item.name }</td>
	      	<td>$ { item.price }</td>
	      	<td>{ item.quantity }</td>
	      	<td>{ item.debt }</td>
	      	<td>{ item.ordered }</td>
	      	<td>
	      		<button className="btn btn-sm btn-warning" data-id={ item._id } onClick={ props.openModal }>
							<span className="glyphicon glyphicon-edit"></span>
						</button>&nbsp;
						<button className="btn btn-sm btn-danger" data-id={ item._id } onClick={ props.onDelete }>
							<span className="glyphicon glyphicon-remove"></span>
						</button>
	      	</td>
	      </tr>
	    )	
		}
		return (
			<table className='stock_table table table-hover table-striped table-bordered'>
				<thead>
					<tr className={ data.sortBy.type === 'asc' ? '' : 'dropup'} >
						<th>#</th>
						{
							this.headInfo.map((item, i) => 
								<th key={ i } 
									className="pointer" 
									data-sort={ item.code } 
									onClick={ props.onSort }
									title={'Сортировать по "' + item.text + '"'}>
									{ item.text }
									<span className={ data.sortBy.code === item.code ? 'caret visible' : 'caret'}></span>
								</th>
							)
						}
						<th>Ред./Уд.</th>
					</tr>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
