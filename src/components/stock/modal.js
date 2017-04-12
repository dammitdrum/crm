import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class StockModal extends Component {
	constructor(props) {
		super(props)
		this.fields = [
      { text: 'Наименование', name: 'name', reg: '.{3,}', mess: 'Не менее 3 символов'},
      { text: 'Артикул', name: 'art', reg: '.{3,}', mess: 'Не менее 3 символов'},
      { text: 'Цена', name: 'price', reg: '^[0-9]+$', mess: 'Только цифры'},
      { text: 'Категория', name: 'category', reg: '.{3,}', mess: 'Не менее 3 символов'},
    ]
	}
	mess(e) {
		e.target.setCustomValidity(e.target.getAttribute('data-mess'))
	}
	change(e) {
		try{ e.target.setCustomValidity('') }catch(e){}
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
        <form className='modal_form'  onSubmit={ props.submit }>
	        <Modal.Body>
	        	{
	        		this.fields.map((field, i) => 
	        			<div key={ i } className="input_field">
				        	<p className='title'>{ field.text }</p>
								  <input type='text' className='input' 
								  	name={ field.name }  
								  	pattern={ field.reg } 
								  	data-mess={ field.mess }
								  	onInvalid={ ::this.mess } 
								  	onChange={ ::this.change }
								  	defaultValue={ props.item ? props.item[field.name] : '' }
								  	required/>
								</div>
	        		)
	        	}
	        </Modal.Body>
	        <Modal.Footer>
	          <button className={ 'btn ' + btnClass } type="submit">
	          	{ btnText } <span className="glyphicon glyphicon-cloud-upload"></span>
	          </button>
	        </Modal.Footer>
      	</form>
      </Modal>
		)
	}
} 

export default StockModal
