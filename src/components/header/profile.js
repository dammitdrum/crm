import React, { Component } from 'react'
import { Link } from 'react-router'

class Profile extends Component {
	render() {
		let data = this.props.profile
		return (
			<ul className="nav navbar-nav navbar-right" > 
		  	<li className={ data.active ? 'active' : '' }>
		      <Link to={ data.path }>{ data.text }</Link>
		    </li>
		  </ul>
		)
	}
} 

export default Profile
