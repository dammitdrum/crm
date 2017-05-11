import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class UserModal extends Component {
	componentWillMount() {
		
	}
	render() {
		const props = this.props
		let title, btnClass, btnText
		let fields = [
      { text: 'Имя пользователя', name: 'name' },
      { text: 'Логин', name: 'login' },
      { text: 'Пароль для пользователя', name: 'password' }
    ]
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
				fields.pop()
				break
		}
		return (
			<Modal show={ props.params.show } onHide={ props.close }>
        <Modal.Header closeButton>
          <h3 className='modal-title'>{ title }</h3>
        </Modal.Header>
        <div className='modal_form long'  >
	        <Modal.Body>
	        	{
	        		fields.map((field, i) => 
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
				      <input 
				      	type='radio' 
				      	name='access' 
				      	value='manager' 
				      	onChange={ props.onChange } 
				      	checked={ props.user.access === 'manager' }/> Менеджер
				    </label>
				    <br/>
				    <label>
				      <input 
				      	type='radio' 
				      	name='access' 
				      	value='admin' 
				      	onChange={ props.onChange }
				      	checked={ props.user.access === 'admin' }/> Администратор
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
