import React, { Component } from 'react'

class Table extends Component {
	constructor(props) {
		super(props)
		this.headInfo =[
      { text: 'Дата создания', code: 'date' },
      { text: 'Номер', code: 'number' },
      { text: 'Покупатель', code: 'customer' },
      { text: 'Кол-во товаров', code: 'items' },
      { text: 'Сумма', code: 'sum' },
      { text: 'Менеджер', code: 'manager' }
    ]
	}
	getClassByState(state) {
		switch (state) {
			case 'new':
				return { td: 'info', span: 'glyphicon-leaf'}
			case 'approved':
				return { td: 'success', span: 'glyphicon-ok'}
			case 'closed':
				return { td: 'warning', span: 'glyphicon-lock'}
			case 'canceled':
				return { td: 'danger', span: 'glyphicon-remove'}
		}
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.deals.length) {
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
			list = props.deals.map((deal, i) =>
	      <tr key={ i }>
	      	<td className={ this.getClassByState(deal.state).td }>
						<span className={ 'glyphicon ' + this.getClassByState(deal.state).span }></span>
					</td>
					<td>{ deal.date }</td>
					<td>{ '№' + deal.number}</td>
					<td>{ deal.customer.name }</td>
					<td>{ deal.items.length + 'поз.'}</td>
					<td>{ deal.sum }</td>
					<td>{ deal.manager.name }</td>
	      </tr>
	    )	
		}
		return (
			<table className='stock_table table table-hover table-striped table-bordered'>
				<thead>
					<tr className={ data.sortBy.type === 'asc' ? '' : 'dropup'} >
						<th></th>
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
					</tr>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
