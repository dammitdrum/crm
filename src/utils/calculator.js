import _ from 'lodash'

function calculator(deal, originalDeal, stock, action) {
  let state = deal.state
  let originalState = originalDeal ? originalDeal.state : false
  let resObj = { success: true }
  let removedItems = []
  
  if (originalDeal) {
    originalDeal.items.forEach(item => {
      if (!_.find(deal.items, { _id: item.id })) {
        removedItems.push({ ...item, _id: item.id})
      }
    })
  }

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
            if (stockItem.quantity - stockItem.debt >= item.number) {
              action({ 
                ...item, 
                debt: stockItem.debt + item.number
              })
            } else {
              resObj = {
                success: false,
                errorMess: `Не хватает свободного товара "${ stockItem.name }" чтобы положить в резерв`
              }
            }
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
          if (removedItems.length) {
            removedItems.forEach(item => {
              let stockItem = _.find(stock, { _id: item._id })
              action({ 
                ...item,
                quantity: stockItem.quantity + item.number
              })
            })
          }
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
            if (stockItem.quantity >= item.number) {
              action({ 
                ...item,
                quantity: stockItem.quantity - item.number
              })
            } else {
              resObj = {
                success: false,
                errorMess: `Не хватает на складе "${ stockItem.name }" чтобы списать`
              }
            }
          })
          break
        case 'approved':
          deal.items.forEach(item => {
            let stockItem = _.find(stock, { _id: item._id })
            if (stockItem.quantity >= item.number) {
              action({ 
                ...item,
                quantity: stockItem.quantity - item.number,
                debt: stockItem.debt - item.number
              })
            } else {
              resObj = {
                success: false,
                errorMess: `Не хватает на складе "${ stockItem.name }" чтобы списать`
              }
            }
          })
          if (removedItems.length) {
            removedItems.forEach(item => {
              let stockItem = _.find(stock, { _id: item._id })
              action({ 
                ...item,
                debt: stockItem.debt - item.number
              })
            })
          }
          break
      }
      break
  }
  return resObj
}

export default calculator