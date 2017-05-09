const config = [
  {
    name: 'name',
    side: 'right',
    title: '3 и более символа',
    message: 'Необходимо ввести короткое название компании',
    regExp: '^.{3,}$'
  },
  {
    name: 'fullName',
    side: 'right',
    title: '5 и более символов',
    message: 'Необходимо ввести полное название компании',
    regExp: '^.{5,}$'
  }
]

export default config 