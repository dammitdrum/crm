import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class CreateModal extends Component {
	mess(e) {
		e.target.setCustomValidity('Только буквы')
	}
	change(e) {
		try{ e.target.setCustomValidity('') }catch(e){}
	}
	render() {
		const props = this.props
		return (
			<Modal show={ props.toggle } onHide={ props.close }>
        <Modal.Header closeButton>
          <h3 className='modal-title'>Создание нового товара</h3>
        </Modal.Header>
        <form className='modal_form'  onSubmit={ props.submit }>
	        <Modal.Body>
	        	<div className="input_field">
		        	<p className='title'>Наименование</p>
						  <input type='text' className='input' name='name' required 
						  	pattern='^[A-Za-zА-Яа-яЁё\s]+$'
						  	onInvalid={ ::this.mess } 
						  	onChange={ ::this.change }/>
						</div>
						<div className="input_field">
		        	<p className='title'>Артикул</p>
						  <input type='text' className='input' name='art' required/>
						</div>
						<div className="input_field">
		        	<p className='title'>Цена</p>
						  <input type='text' className='input' name='price' pattern='^[0-9]+$' required/>
						</div>
	        	<div className="input_field">
		        	<p className='title'>Категория</p>
						  <input type='text' className='input' name='category' pattern='^[A-Za-zА-Яа-яЁё\s]+$' required/>
						</div>
	        </Modal.Body>
	        <Modal.Footer>
	          <button className="btn btn-success" type="submit">
	          	Создать товар <span className="glyphicon glyphicon-cloud-upload"></span>
	          </button>
	        </Modal.Footer>
      	</form>
      </Modal>
		)
	}
} 

export default CreateModal
