const socketIO = socket => ({ dispatch }) => next => action => {
  if (action.meta && action.meta.socketInit) {
    socket.on(action.meta.socketInit.channel, (data) => {
      dispatch({
        type: action.meta.socketInit.action,
        payload: data.payload
      })
    })
  }
  if (action.meta && action.meta.socket && action.meta.socket.channel) {
    let io = socket
    if (action.meta.socket.namespace) {
      io = io.of(action.meta.socket.namespace)
    }
    if (action.meta.socket.room) {
      io = io.to(action.meta.socket.room)
    }
    io.emit(action.meta.socket.channel, action)
  }

  return next(action)
}

export default socketIO