import React, { Component } from 'react'
import dateFormat from 'dateformat'
import Enum from '../../utils/Enum'

class Table extends Component {
	constructor(props) {
		super(props)
		this.headInfo =[
      { text: 'Дата создания', code: 'date' },
      { text: 'Номер', code: 'number' },
      { text: 'Покупатель', code: 'client' },
      { text: 'Кол-во товаров', code: 'items' },
      { text: 'Сумма', code: 'sum' },
      { text: 'Менеджер', code: 'manager' }
    ]
	}
	getInfoByState(state) {
		switch (state) {
			case Enum.defaultStateDeals:
				return { text: Enum.defaultStateDeals }
			case 'new':
				return { td: 'info', span: 'glyphicon-leaf', text: 'Новые' }
			case 'approved':
				return { td: 'success', span: 'glyphicon-ok', text: 'Подтвержденные' }
			case 'closed':
				return { td: 'warning', span: 'glyphicon-lock', text: 'Завершенные' }
			case 'canceled':
				return { td: 'danger', span: 'glyphicon-remove', text: 'Отмененные' }
		}
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.deals.length) {
			list = (
				<tr>
					<td colSpan="7" className="no_res">
						<strong>Ничего нет
							{ data.searchQuery ? ' по запросу "' 
							+ data.searchQuery.trim() 
							+ '" в "' + this.getInfoByState(data.activeState).text 
							+ '" сделки' : ''}
						</strong>
					</td>
				</tr>
			)
		} else {
			list = props.deals.map((deal, i) =>
	      <tr key={ i } data-id={ deal.number } onClick={ props.openDeal } className='pointer'>
	      	<td className={ this.getInfoByState(deal.state).td }>
						<span className={ 'glyphicon ' + this.getInfoByState(deal.state).span }></span>
					</td>
					<td>{ dateFormat(deal.date, 'yyyy.mm.dd HH:MM') }</td>
					<td>{ '№' + deal.number}</td>
					<td>{ deal.client.name }</td>
					<td>{ deal.items.length + 'поз.'}</td>
					<td>{ '$ ' + deal.sum }</td>
					<td>{ deal.manager.name }</td>
	      </tr>
	    )	
		}
		return (
			<table className='stock_table deals table table-hover table-striped table-bordered'>
				<thead>
					<tr className={ data.sortBy.type === 'asc' ? '' : 'dropup'} >
						<th>Статус</th>
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
