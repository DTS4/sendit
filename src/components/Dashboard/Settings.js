import { useState } from "react"
import "../../styles/Settings.css"

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
  })

  const toggleSetting = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }))
  }

  return (
    <div className="settings-container">
      <h1 className="settings-title"></h1>
      <div className="settings-card">
        {/* Email Notifications */}
        <div className="settings-item">
          <div className="settings-info">
            <h2 className="settings-subtitle">Email Notifications</h2>
            <p className="settings-description">
              Receive email notifications for important updates
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => toggleSetting("emailNotifications")}
            />
            <span className="slider"></span>
          </label>
        </div>


      </div>
    </div>
  )
}

export default Settings
