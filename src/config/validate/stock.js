const config = [
  {
    name: 'name',
    side: 'right',
    title: '3 и более символа',
    message: 'Необходимо ввести наименование',
    regExp: '^.{3,}$'
  },
  {
    name: 'art',
    side: 'right',
    title: '5 и более символов',
    message: 'Необходимо ввести артикул(без пробелов)',
    regExp: '^.[^\\s]{4,}$'
  },
  {
    name: 'price',
    side: 'right',
    title: 'Только цифры',
    message: 'Необходимо ввести цену',
    regExp: '^\\d+(\\.\\d{1,})?$'
  },
  {
    name: 'category',
    side: 'right',
    title: '3 и более символа',
    message: 'Необходимо ввести наименование',
    regExp: '^.{3,}$'
  },
  {
    name: 'quantity',
    side: 'right',
    title: 'Только цифры(целое число)',
    message: 'Необходимо ввести кол-во в наличии',
    regExp: '^\\-?\\d+$'
  },
  {
    name: 'ordered',
    side: 'right',
    title: 'Только цифры(целое число)',
    message: 'Необходимо ввести заказанное кол-во',
    regExp: '^\\d+$'
  }
]

export default config 