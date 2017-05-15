
function calculator(deal, originalDeal, stock, action) {
  let state = deal.state
  let originalState = originalDeal.state

  switch (originalState) {
    case 'new':
    case 'canceled':
      switch (state) {
        case 'approved':
          deal.items.forEach(item => {
            stockItem = _.find(stock, i => i._id === item.id)
            if (stockItem.quantity - stockItem.debt >= item.number) {
              
            }
          })
      }

  }
}

export default calculator