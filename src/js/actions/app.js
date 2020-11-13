const onStatusChanges = dispatch => () => {
  const isOnline = navigator.onLine
  const action = navigator.onLine 
    ? {type: 'APP_IS_ONLINE', isOnline} 
    : {type: 'APP_IS_OFFLINE', isOnline}
    dispatch(action)
}

export const listenToConnectionChanges = () => dispatch => {
  const connectionHandler = onStatusChanges(dispatch)
  window.addEventListener('online', connectionHandler)
  window.addEventListener('offline', connectionHandler)

  return () => {
    window.removeEventListener('online', connectionHandler)
    window.removeEventListener('offline', connectionHandler)
  }
}