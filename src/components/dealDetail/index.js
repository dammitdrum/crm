import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Table from './table'


class Deal extends Component {
	componentWillMount() {
     
  }
  
  render() {
    
    return (
      <div className='deal_detail container'>
        <h3>Создание новой сделки</h3>
        <hr/>
        <form name="form" className="modal_form clearfix">
        <p><strong>Статус продажи</strong></p>
        <div className="btn-group" role="group">
          <button className="btn btn-sm btn-default active">Новая <span className="glyphicon glyphicon-leaf"></span></button>
          <button className="btn btn-sm btn-default">Подтвержденная <span className="glyphicon glyphicon-ok"></span></button>
          <button className="btn btn-sm btn-default">Завершенная <span className="glyphicon glyphicon-lock"></span></button>
          <button className="btn btn-sm btn-default">Анулированная <span className="glyphicon glyphicon-remove"></span></button>
        </div>
          <div className="air"></div>
          <h4>Введите номер продажи</h4>
          <input className='search_field' type="text" pattern="/^\d+$/" name="number" required/>
          <div className="air"></div>
          <div className="pull-left clearfix">
            <span className="btn btn-default">
              Выбрать покупателя 
              &nbsp;<span className="glyphicon glyphicon-menu-hamburger"></span>
            </span>
            <strong>&nbsp; Не выбран покупатель </strong>
          </div>
          <div className="pull-right">
            <DropdownButton bsStyle='default' title='Выберите менеджера' id='dropDown'>
              <MenuItem>Менеджер крутой</MenuItem>
              <MenuItem>Менеджер еще круче</MenuItem>
              <MenuItem>Менеджер 1</MenuItem>
            </DropdownButton>
          </div>
          <div className="air"></div>
          <Table items={[]}/>
          <div className="air"></div>
          <button className="btn btn-lg btn-success pull-right" type="submit">
            Создать продажу <span className="glyphicon glyphicon-cloud-upload"></span>
          </button>
          <a href="#/deals" className="btn btn-lg btn-default pull-left">
            <span className="glyphicon glyphicon-arrow-left"></span> Отмена
          </a>
        </form>
      </div>
    )
  }
}

/*const mapStateToProps = state => (
  {
    title: state.deals.title
  }
)

const mapDispatchToProps = dispatch => (
  {
    getData: bindActionCreators(Actions.getData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deals)*/
export default Deal
