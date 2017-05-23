import 'whatwg-fetch'

function parseJSON(res) {
  return res.json()
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var error = new Error(res.statusText)
    error.res = res
    throw error
  }
}

export default function request(EP, method, body) {
	if (!method) method = 'GET'
	switch (method) {
		case 'GET':
			return fetch(EP, {
				credentials: 'same-origin'
			}).then(checkStatus).then(parseJSON)

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
			}).then(checkStatus).then(parseJSON)
	}
}
