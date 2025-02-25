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
      <h1 className="settings-title">Settings</h1>
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

        {/* Dark Mode */}
        <div className="settings-item">
          <div className="settings-info">
            <h2 className="settings-subtitle">Dark Mode</h2>
            <p className="settings-description">
              Enable dark mode for the dashboard
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => toggleSetting("darkMode")}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Two-Factor Authentication */}
        <div className="settings-item">
          <div className="settings-info">
            <h2 className="settings-subtitle">Two-Factor Authentication</h2>
            <p className="settings-description">
              Enable two-factor authentication for added security
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => toggleSetting("twoFactorAuth")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Settings
