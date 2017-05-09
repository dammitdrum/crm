import React, { Component } from 'react'

class Table extends Component {
	constructor(props) {
		super(props)
		this.headInfo =[
      { text: 'Краткое название', code: 'name' },
      { text: 'Полное название', code: 'fullName' },
      { text: 'Контакты', code: 'contact' },
      { text: 'Контактные лица', code: 'person' }
    ]
	}
	render() {
		let props = this.props
		let data = props.data, list

		if (!props.items.length) {
			list = (
				<tr>
					<td colSpan={ props.access < 120 ? 6 : 5 } className="no_res">
						<strong>Ничего нет
							{ data.searchQuery ? ' по запросу "' + data.searchQuery.trim() + '"': '' }
						</strong>
					</td>
				</tr>
			)
		} else {
			list = props.items.map((item, i) =>
	      <tr key={ i }>
	      	<td>{ i + 1 }</td>
	      	{
	      		this.headInfo.map((info, i) =>
	      			<td key={ i }>{ info.code === 'price' ? '$' : '' } { item[info.code] }</td>
	      		)
	      	}
      		{
      			props.access < 110 ?
      			<td className='td_btn'>
	      			<button className="btn btn-sm btn-warning" data-id={ item._id } onClick={ props.openModal }>
								<span className="glyphicon glyphicon-edit"></span>
							</button>&nbsp;
							<button className="btn btn-sm btn-danger" data-id={ item._id } onClick={ props.onDelete }>
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</td>
      			: props.access < 120 ?
      			<td className='td_btn'>
	      			<button className="btn btn-sm btn-warning" data-id={ item._id } onClick={ props.openModal }>
								<span className="glyphicon glyphicon-edit"></span>
							</button>&nbsp;
						</td>
      			: null
      		}
	      </tr>
	    )	
		}
		return (
			<table className='table stock_table table-hover table-striped table-bordered'>
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
						{
							props.access < 110 ?
							<th className='th_btn'>Ред./Уд.</th>
							: props.access < 120 ?
							<th className='th_btn'>Ред.</th>
							: null
						}
						
					</tr>
				</thead>
				<tbody>{list}</tbody>
			</table>
		)
	}
} 

export default Table
