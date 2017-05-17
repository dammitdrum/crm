import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Enum from '../../utils/Enum'

class Controls extends Component {
  componentWillMount() {
    this.stateBtn =[
      { text: 'Новая', cssClass: 'glyphicon-leaf', state: 'new' },
      { text: 'Подтвержденная', cssClass: 'glyphicon-ok', state: 'approved' },
      { text: 'Завершенная', cssClass: 'glyphicon-lock', state: 'closed' },
      { text: 'Отмененная', cssClass: 'glyphicon-remove', state: 'canceled' }
    ]
  }
  render() {
    let props = this.props

    return (
      <div className="controls"> 
        {
          props.access < 330 ?
          <div className="air">
            <h4>Изменить статус сделки:</h4>
            <div className="btn-group" role="group">
              {
                this.stateBtn.map((btn, i) => 
                  <span 
                    key={ i } 
                    className={ 'btn btn-sm btn-default' + (props.dealState === btn.state ? ' active' : '') }
                    onClick={ props.clickStateBtn }
                    data-state={ btn.state }>
                    { btn.text } <span className={ 'glyphicon ' + btn.cssClass }></span>
                  </span>
                )
              }
            </div>
          </div> : null
        }
        {
          props.access < 330 ? 
          <div className='pos air' data-valid-wrap='number'>
            <h4>Введите номер сделки</h4>
            <input 
              className='search_field' 
              type="text"
              name="number" 
              value={ props.number }
              onChange={ props.changeNumber }
              data-valid='number'
              required/>
          </div> 
          :
          <div className='pos air' data-valid-wrap='number'>
            <h4>Номер сделки: <strong>№ { props.number }</strong></h4>
          </div>
        }
        {
          props.access < 330 ? 
          <div className="pull-left pos clearfix" data-valid-wrap='client'>
            <span 
              className="btn btn-default" 
              onClick={ props.openModal } 
              data-modal='clients'
              data-valid='client'>
              Выбрать покупателя 
              &nbsp;<span className="glyphicon glyphicon-menu-hamburger"></span>
            </span>
            <strong>&nbsp; { props.client ? props.client.name : '' }</strong>
          </div>
          :
          <div className="pull-left pos clearfix">
            <span>Покупатель:</span>
            <strong>&nbsp; { props.client.name }</strong>
          </div>
        }
        {
          props.managerList ? 
          <div className="pull-right">
            <span>Менеджер сделки &nbsp;</span>
            <DropdownButton 
              bsStyle='default' 
              pullRight 
              title={ props.manager ? props.manager.name : '' } 
              id='dropDown'>
              {
                props.managerList.map((manager, i) => 
                  <MenuItem 
                    onClick={ props.selectManager } 
                    key={ i } 
                    data-id={ manager.login }>
                    { manager.name }
                  </MenuItem>
                )
              }
            </DropdownButton>
          </div> : ''
        }
        
      </div>
    )
  }
} 

export default Controls




