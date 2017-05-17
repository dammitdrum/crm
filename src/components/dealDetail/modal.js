import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class DealModal extends Component {
	componentWillMount() {
		
	}
	render() {
		let props = this.props
		let modal = props.modal
		let tableInfo = []
		let items = props[modal.mode]
		let title, list, onSet

		switch (props.modal.mode) {
			case 'stock':
				title = 'Выберите товар'
				onSet = props.onAddItem
				tableInfo = [
		      { text: 'Артикул', code: 'art' },
		      { text: 'Наименование', code: 'name' },
		      { text: 'Цена', code: 'price' },
		      { text: 'Наличие', code: 'quantity' },
		      { text: 'Обязательства', code: 'debt' },
		      { text: 'Заказано', code: 'ordered' }
		    ]
				break

			case 'clients':
				title = 'Выберите покупателя'
				onSet = props.onSetClient
				tableInfo = [
		     	{ text: 'Наименование', code: 'name' },
		      { text: 'Полное наименование', code: 'fullName' },
		      { text: 'Контакты', code: 'contact' },
		      { text: 'Контактное лицо', code: 'person' }
		    ]
				break
		}
		if (modal.searchQuery) {
      items = _.filter(
        items, 
        item => item.name.toLowerCase().indexOf(modal.searchQuery.trim()) !== -1
      )
    }
    items = _.orderBy(items, [modal.sortBy.code], [modal.sortBy.type])

		if (!items.length) {
			list = (
				<tr>
					<td colSpan="7" className="no_res">
						<strong>Ничего не найдено по запросу "{ modal.searchQuery }"</strong>
					</td>
				</tr>
			)
		} else {
			list = items.map((item, i) =>
	      <tr key={ i } 
	      	onClick={ item.quantity <= 0 ? '' : onSet } 
	      	data-id={ item._id } 
	      	className={ item.quantity <= 0 ? 'disabled' : 'pointer' }>
	      	<td>{ i + 1 }</td>
	      	{
	      		tableInfo.map((info, i) =>
	      			<td key={ i }>{ info.code === 'price' ? '$' : '' } { item[info.code] }</td>
	      		)
	      	}
	      </tr>
	    )	
		}
		return (
			<Modal bsSize='lg' show={ modal.show } onHide={ props.close }>
        <Modal.Header closeButton>
          <h3 className='modal-title'>{ title }</h3>
        </Modal.Header>
        <Modal.Body>
	        <span className="search_wrap">
					  <input type="text" 
					    placeholder="Искать по названию"
					    className="search_field"
					    onChange={ props.onSearch }
					    value={ modal.searchQuery }
					  />
					  {
					  	modal.searchQuery.length ?
					  	<span className="clear_search" onClick={ props.onClearSearch }>×</span> : ''
					  }
				  </span>
        	<table className='stock_table deals table table-hover table-bordered'>
						<thead>
							<tr className={ modal.sortBy.type === 'asc' ? '' : 'dropup'} >
								<th>#</th>
								{
									tableInfo.map((item, i) => 
										<th key={ i } 
											className="pointer" 
											data-sort={ item.code } 
											onClick={ props.onSort }
											title={'Сортировать по "' + item.text + '"'}>
											{ item.text }
											<span className={ modal.sortBy.code === item.code ? 'caret visible' : 'caret'}></span>
										</th>
									)
								}
							</tr>
						</thead>
						<tbody>{ list }</tbody>
					</table>
        </Modal.Body>
      </Modal>
		)	
	}
} 

export default DealModal
