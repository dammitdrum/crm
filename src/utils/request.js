import 'whatwg-fetch'

export default function request({ EP, method, body }, dispatch, { successAction, failAction }) {
	return fetch(EP, {
		method: method,
		headers: {
			'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify(body)
	}).then(function(res) {
	    return res.json()
	  }).then(successAction).catch(failAction)
}
