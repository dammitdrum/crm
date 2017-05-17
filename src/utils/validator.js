
class Validator {
	constructor(action, config) {
    this.action = action
		this.config = config
	}
  validate(state) {
    let res = true
    _.forIn(state, (val, prop) => {
      if (!res) return
      if (!this._check(val, prop)) {
        this.action(this._setPopover(this._getConfig(prop), true))
        res = false
      } else {
        this.action(this._setPopover(null, false))
      }
    })
    return res
  }
  _check(val, prop) {
    const config = this._getConfig(prop)
    let res = false
    if (!config) return true
    if (config.regExp) {
      let reg = new RegExp(config.regExp, 'g')
      res = reg.test(val)
    } else {
      res = !!val
    }
    return res
  }
  _getConfig(name) {
    return _.find(this.config, item => item.name === name)
  }
  _setPopover(config, show) {
    return {
      show: show,
      side: config ? config.side : '',
      title: config ? config.title : '',
      message: config ? config.message : '',
      name: config ? config.name : ''
    }
  }
}

export default Validator
