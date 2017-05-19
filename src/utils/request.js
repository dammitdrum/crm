import 'whatwg-fetch'

export default function request(EP, method, body) {
	if (!method) method = 'GET'
	switch (method) {
		case 'GET':
			return fetch(EP, {
				credentials: 'same-origin'
			}).then(function(res) {
		    return res.json()
		  })

		case 'POST':
		case 'PUT':
		case 'DELETE':
			return fetch(EP, {
				method: method,
				headers: {
					'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  credentials: 'same-origin',
				body: body ? JSON.stringify(body) : ''
			}).then(function(res) {
		    return res.json()
		  })
	}
	
}
