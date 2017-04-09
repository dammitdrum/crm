
import React, { Component } from 'react'

class Categories extends Component {
	render() {
		const config = this.props
		return (
			<div className="input_field">
				<p className="title">{ config.text }</p>
			  <input type="text" 
			    className="input"
			    name={ config.name }
			    pattern={ config.pattern }
			    required
			  />
			  <p className="text-danger">
			  	<span className="glyphicon glyphicon-exclamation-sign"></span> { config.warning }
			  </p>
			</div>
		)
	}
} 

export default Categories
