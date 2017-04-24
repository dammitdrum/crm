import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Enum from '../../utils/Enum'

class Controls extends Component {
  constructor(props) {
    super(props)
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
        <p><strong>Статус сделки</strong></p>
        <div className="btn-group" role="group">
          {
            this.stateBtn.map((btn, i) => 
              <span 
                key={ i } 
                className={ 'btn btn-sm btn-default' + (props.currentState === btn.state ? ' active' : '') }
                onClick={ props.clickStateBtn }
                data-state={ btn.state }>
                { btn.text } <span className={ 'glyphicon ' + btn.cssClass }></span>
              </span>
            )
          }
        </div>
        <div className="air"></div>
        <h4>Введите номер сделки</h4>
        <input className='search_field' type="text" pattern="/^\d+$/" name="number" required/>
        <div className="air"></div>
        <div className="pull-left clearfix">
          <span className="btn btn-default" onClick={ props.openModal } data-modal='clients'>
            Выбрать покупателя 
            &nbsp;<span className="glyphicon glyphicon-menu-hamburger"></span>
          </span>
          <strong>&nbsp; Не выбран покупатель </strong>
        </div>
        {
          props.managers ? 
          <div className="pull-right">
            Менеджер сделки &nbsp;
            <DropdownButton 
              bsStyle='default' 
              pullRight 
              title={ props.currentManager ? props.currentManager.name : '' } 
              id='dropDown'>
              {
                props.managers.map((manager, i) => 
                  <MenuItem onClick={ props.selectManager } key={ i } data-id={ manager.login }>{ manager.name }</MenuItem>
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




