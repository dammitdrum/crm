
class Validator {
	constructor(action, config) {
    this.action = action
		this.config = config
	}
	setValid(state, propName, value) {
    let popover
    _.forIn(state, (val, prop) => {
      if (prop === propName) {
        let config = this._getConfig(propName)
        if (config.regExp) {
          let reg = new RegExp(config.regExp, 'g')
          value = reg.test(value)
        }
        state[prop] = value
        this.action(state, this._setPopover(config, !value))
      }
    })
	}
	validate(state) {
		let res = true
    _.forIn(state, (val, prop) => {
    	if (!res) return
      if (!val) {
        this.action(state, this._setPopover(this._getConfig(prop), true))
        res = false
      }
    })
    return res
	}
  _getConfig(name) {
    return _.find(this.config, item => item.name === name)
  }
  _setPopover(config, show) {
    return {
      show: show,
      side: config.side,
      title: config.title,
      message: config.message,
      name: config.name
    }
  }
}

export default Validator