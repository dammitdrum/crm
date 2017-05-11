import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class StockModal extends Component {
	componentWillMount() {
		this.fields = [
      { text: 'Наименование', name: 'name' },
      { text: 'Артикул', name: 'art' },
      { text: 'Цена', name: 'price' },
      { text: 'Категория', name: 'category' },
      { text: 'Кол-во в наличии', name: 'quantity' },
      { text: 'Заказано', name: 'ordered' }
    ]
	}
	render() {
		const props = this.props
		let title, btnClass, btnText

		switch (props.params.mode) {
			case 'create':
				title = 'Создание нового товара'
				btnClass = 'btn-success'
				btnText = 'Создать товар'
				break

			case 'edit':
				title = 'Редактирование товара'
				btnClass = 'btn-warning'
				btnText = 'Сохранить товар'
				break
		}
		return (
			<Modal bsSize='sm' show={ props.params.show } onHide={ props.close }>
        <Modal.Header closeButton>
          <h4 className='modal-title'>{ title }</h4>
        </Modal.Header>
        <div className='modal_form'  >
	        <Modal.Body>
	        	{
	        		this.fields.map((field, i) => 
	        			<div key={ i } className="input_field pos" data-valid-wrap={ field.name }>
				        	<p className='title'>{ field.text }</p>
								  <input type='text' className='input' 
								  	name={ field.name }
								  	onChange={ props.onChange }
								  	value={ props.item[field.name] }
								  	data-valid={ field.name }/>
								</div>
	        		)
	        	}
	        </Modal.Body>
	        <Modal.Footer>
	          <button className={ 'btn ' + btnClass } onClick={ props.submit }>
	          	{ btnText } <span className="glyphicon glyphicon-cloud-upload"></span>
	          </button>
	        </Modal.Footer>
      	</div>
      </Modal>
		)
	}
} 

export default StockModal
