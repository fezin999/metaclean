import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'metaclean_auth'
const USERS_KEY = 'metaclean_users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    setLoading(false)
  }, [])

  // Get registered users from localStorage
  const getUsers = () => {
    try {
      const stored = localStorage.getItem(USERS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  // Register a new user
  const register = (name, email, password) => {
    const users = getUsers()

    // Check if email already exists
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists')
    }

    // Validate inputs
    if (!name.trim()) throw new Error('Name is required')
    if (!email.trim() || !email.includes('@')) throw new Error('Valid email is required')
    if (password.length < 6) throw new Error('Password must be at least 6 characters')

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: btoa(password), // Basic encoding (in production use proper hashing)
      createdAt: new Date().toISOString(),
      plan: 'registered', // registered = 8 files
    }

    users.push(newUser)
    saveUsers(users)

    // Auto-login after registration
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, plan: newUser.plan }
    setUser(session)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

    return session
  }

  // Login with email and password
  const login = (email, password) => {
    const users = getUsers()
    const found = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === btoa(password)
    )

    if (!found) {
      throw new Error('Invalid email or password')
    }

    const session = { id: found.id, name: found.name, email: found.email, plan: found.plan }
    setUser(session)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

    return session
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Get file limit based on auth state
  const getFileLimit = () => {
    return user ? 8 : 5
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        getFileLimit,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
