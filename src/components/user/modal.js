import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class UserModal extends Component {
	componentWillMount() {
		this.fields = [
      { text: 'Имя пользователя', name: 'name' },
      { text: 'Логин', name: 'login' },
      { text: 'Пароль для пользователя', name: 'password' }
    ]
	}
	render() {
		const props = this.props
		let title, btnClass, btnText

		switch (props.params.mode) {
			case 'create':
				title = 'Создание нового пользователя'
				btnClass = 'btn-success'
				btnText = 'Создать пользователя'
				break

			case 'edit':
				title = 'Редактирование пользователя'
				btnClass = 'btn-warning'
				btnText = 'Сохранить'
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
	        			<div key={ i } className='input_field pos' data-valid-wrap={ field.name }>
				        	<p className='title'>{ field.text }</p>
								  <input type='text' className='input' 
								  	name={ field.name }
								  	onChange={ props.onChange }
								  	value={ props.user[field.name] }
								  	data-valid={ field.name }/>
								</div>
	        		)
	        	}
	        	<p>Уровень доступа</p>
				    <label>
				      <input type='radio' name='access' value='manager'/>
				      Менеджер
				    </label>
				    <label>
				      <input type='radio' name='access' value='admin'/>
				      Администратор
				    </label>
	        </Modal.Body>
	        <Modal.Footer>
	          <button className={ 'btn ' + btnClass } onClick={ props.submit }>
	          	{ btnText } <span className='glyphicon glyphicon-cloud-upload'></span>
	          </button>
	        </Modal.Footer>
      	</div>
      </Modal>
		)
	}
} 

export default UserModal
