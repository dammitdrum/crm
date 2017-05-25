const socketIO = socket => ({ dispatch }) => next => action => {
  const meta = action.meta
  if (meta && meta.socketInit) {
    socket.on('change:data', (data) => {
      dispatch({
        type: data.type,
        payload: data.payload
      })
      dispatch({
        type: 'EXTERNAL_CHANGED_APP_DATA'
      })
    })
  }
  if (meta && meta.socket && meta.socket.channel) {
    let io = socket
    if (meta.socket.namespace) {
      io = io.of(meta.socket.namespace)
    }
    if (meta.socket.room) {
      io = io.to(meta.socket.room)
    }
    io.emit(meta.socket.channel, action)
  }

  return next(action)
}

export default socketIO