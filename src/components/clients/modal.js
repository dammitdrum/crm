import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class StockModal extends Component {
	componentWillMount() {
		this.fields = [
      { text: 'Краткое название', name: 'name' },
      { text: 'Полное название', name: 'fullName' },
      { text: 'Контакты', name: 'contact' },
      { text: 'Контактные лица', name: 'person' }
    ]
	}
	render() {
		const props = this.props
		let title, btnClass, btnText

		switch (props.params.mode) {
			case 'create':
				title = 'Создание контрагента'
				btnClass = 'btn-success'
				btnText = 'Создать контрагента'
				break

			case 'edit':
				title = 'Редактирование контрагента'
				btnClass = 'btn-warning'
				btnText = 'Сохранить контрагента'
				break
		}
		return (
			<Modal show={ props.params.show } onHide={ props.close }>
        <Modal.Header closeButton>
          <h4 className='modal-title'>{ title }</h4>
        </Modal.Header>
        <div className='modal_form long'  >
	        <Modal.Body>
	        	{
	        		this.fields.map((field, i) => 
	        			<div key={ i } className="input_field pos" data-valid-wrap={ field.name }>
				        	<p className='title'>{ field.text }</p>
								  <input type='text' className='input' 
								  	name={ field.name }
								  	data-mess={ field.mess }
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
