
class Validator {
	constructor(action) {
		this.action = action
	}
	setValid(data, propName, value) {
    let props = data.props, popover
    props = props.map(prop => {
      if (prop.name === propName) {
      	if (prop.regExp) {
          let reg = new RegExp(prop.regExp, 'g')
      		value = reg.test(value)
      	} 
        prop.valid = value
        popover = this._setPopover(prop, !value)
      }
      return prop
    })
    this.action({
      props,
      popover: popover
    })
	}
	validate(data) {
		let res = true
    data.props.forEach(prop => {
    	if (!res) return
      if (!prop.valid) {
        this.action({
          ...data,
          popover: this._setPopover(prop, true)
        })
        res = false
      }
    })
    return res
	}
  _setPopover(prop, show) {
    return {
      show: show,
      side: prop.side,
      title: prop.title,
      message: prop.message,
      name: prop.name
    }
  }
}

export default Validator