import _ from 'lodash'

function calculator(deal, originalDeal, stock, action) {
  let state = deal.state
  let originalState = originalDeal ? originalDeal.state : false

  switch (state) {
    case 'new':
    case 'canceled':
      switch (originalState) {
        case 'approved':
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item,
              debt: stockItem.debt - item.number < 0 ? 0 : stockItem.debt - item.number
            })
          })
          break
        case 'closed':
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item,
              quantity: stockItem.quantity + item.number
            })
          })
          break
      }
      break
    case 'approved':
      switch (originalState) {
        case 'new':
        case 'canceled':
        case false:
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item, 
              debt: stockItem.debt + item.number
            })
          })
          break
        case 'closed':
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item,
              quantity: stockItem.quantity + item.number,
              debt: stockItem.debt + item.number
            })
          })
          break
      }
      break
    case 'closed':
      switch (originalState) {
        case 'new':
        case 'canceled':
        case false:
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item,
              quantity: stockItem.quantity - item.number
            })
          })
          break
        case 'approved':
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            action({ 
              ...item,
              quantity: stockItem.quantity - item.number,
              debt: stockItem.debt - item.number
            })
          })
          break
      }
      break
  }
}

export default calculator