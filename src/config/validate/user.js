const config = [
  {
    name: 'name',
    side: 'right',
    title: '3 и более символа',
    message: 'Необходимо ввести имя',
    regExp: '^.{3,}$'
  },
  {
    name: 'login',
    side: 'right',
    title: '3 и более символов',
    message: 'Необходимо ввести логин(без пробелов)',
    regExp: '^.[a-zA-Z0-9]{2,}$'
  }
]

export default config 