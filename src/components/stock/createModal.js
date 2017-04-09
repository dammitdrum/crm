import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class CreateModal extends Component {
	render() {
		const props = this.props
		return (
			<Modal show={ props.toggle } onHide={ props.close }>
				<form className='modal_form'  onSubmit={ props.submit }>
	        <Modal.Header closeButton>
	          <h3 className='modal-title'>Создание нового товара</h3>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="input_field">
		        	<p className='title'>Наименование</p>
						  <input type='text' className='input' name='name' required/>
						  <p className='text-danger'>
						  	<span className='glyphicon glyphicon-exclamation-sign'></span> Необходимо наименование товара
						  </p>
						</div>
						<div className="input_field">
		        	<p className='title'>Артикул</p>
						  <input type='text' className='input' name='art' required/>
						  <p className='text-danger'>
						  	<span className='glyphicon glyphicon-exclamation-sign'></span> Необходим артикул
						  </p>
						</div>
						<div className="input_field">
		        	<p className='title'>Цена</p>
						  <input type='text' className='input' name='price' pattern='^[0-9]+$' required/>
						  <p className='text-danger'>
						  	<span className='glyphicon glyphicon-exclamation-sign'></span> Укажите цену(только цифры)
						  </p>
						</div>
	        	<div className="input_field">
		        	<p className='title'>Категория</p>
						  <input type='text' className='input' name='category' pattern='^[A-Za-zА-Яа-яЁё\s]+$' required/>
						  <p className='text-danger'>
						  	<span className='glyphicon glyphicon-exclamation-sign'></span> Укажите категорию товара(только буквы)
						  </p>
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
