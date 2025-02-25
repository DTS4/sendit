import { createContext, useState, useContext } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}


export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export default UserContext;

