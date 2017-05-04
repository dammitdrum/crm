const config = [
  {
    name: 'name',
    side: 'right',
    title: '3 и более символа',
    message: 'Необходимо ввести наименование',
    regExp: '^.[^\\s]{2,}$'
  },
  {
    name: 'art',
    side: 'right',
    title: '5 и более символов',
    message: 'Необходимо ввести артикул',
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
    regExp: '^.[^\\s]{2,}$'
  },
]

export default config 