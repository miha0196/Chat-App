import Notification from '../../utils/notifications';
import Storage from '../../utils/storage'

export default store => next => action => {
  switch (action.type) {
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':
      const { showNotifications } = store.getState().settings
      showNotifications && Notification.show({
        title: 'Connection status:', 
        body: action.isOnline 
          ? 'Online' 
          : 'Offline'
      })
    case 'SETTINGS_UPDATE': {
      const { setting, value } = action
      const pasrsedCurrentSettings = Storage.getItem('app-settings')
      const settings = {...pasrsedCurrentSettings, [setting]: value}
      Storage.setItem('app-settings', settings)
    }
    case 'AUTH_LOGOUT_SUCCESS': {
      const { messageSubs } = store.getState().chats

      if (messageSubs) {
        Object.keys(messageSubs).forEach(messageSub => {
          messageSubs[messageSub]()
        })
      }
    }

  }

  next(action)
}