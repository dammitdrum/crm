const config = {
  popover: {
    show: false
  },
  props: [
    {
      name: 'number',
      valid: false,
      side: 'right',
      title: 'Только цифры!',
      message: 'Необходимо ввести корректный номер сделки',
      regExp: '^[0-9]+$'
    },
    {
      name: 'client',
      valid: false,
      side: 'right',
      title: 'Не выполнено!',
      message: 'Необходимо выбрать покупателя'
    }
  ]
}



export default config