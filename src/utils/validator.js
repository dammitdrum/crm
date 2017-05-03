
class Validator {
	constructor(action) {
		this.action = action
	}
	setValid(data, propName, value) {
    let props = data.props
    props = props.map(prop => {
      if (prop.name === propName) {
      	if (prop.regExp) {
      		value = prop.regExp.test(value)
      	}
        prop.valid = value
      }
      return prop
    })

    this.action({
      props,
      popover: {
        ...data.popover,
        show: !value,
      }
    })
	}
	validate(data) {
		let res = true
    data.props.forEach(prop => {
    	if (!res) return
      if (!prop.valid) {
        this.action({
          ...data,
          popover: {
            show: true,
            side: prop.side,
            title: prop.title,
            message: prop.message,
            name: prop.name
          }
        })
        res = false
      }
    })
    return res
	}
}

export default Validator