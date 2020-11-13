export const updateSettings = (setting, value) => {
  return {
    type: 'SETTINGS_UPDATE',
    value,
    setting
  }
} 

export const loadInitialettings = () => ({
  type: 'SETTINGS_INITIAL_LOAD'
})