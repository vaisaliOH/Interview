
import React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, LogOut, BookOpen, User, Bell } from "lucide-react"

const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isAuthenticated = !!localStorage.getItem("token")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isAuthenticated) return null

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const primaryLinks = [
    { label: "Dashboard", emoji: "🏠", path: "/home", description: "Overview & Stats" },
    { label: "Add Question", emoji: "➕", path: "/add", description: "Create New Questions" },
    { label: "Question Bank", emoji: "📋", path: "/view", description: "Browse All Questions" },
  ]

  const secondaryLinks = [
    { label: "Analytics", emoji: "📊", path: "/analytics", description: "Performance Insights" },
    { label: "Revision", emoji: "🧠", path: "/revision", description: "Flashcard Mode" },
    { label: "Mock Tests", emoji: "🏢", path: "/company-test", description: "Company Practice" },
  ]

  const renderNavLink = (link, isMobile = false) => {
    const isActive = pathname === link.path

    if (isMobile) {
      return (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setMenuOpen(false)}
          className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
              : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-blue-100"
            }`}
          >
            {link.emoji}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{link.label}</div>
            <div className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>{link.description}</div>
          </div>
        </Link>
      )
    }

    return (
      <Link
        key={link.path}
        to={link.path}
        className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:scale-105"
        }`}
      >
        <span className="text-lg">{link.emoji}</span>
        <span className="text-sm font-semibold">{link.label}</span>

        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {link.description}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </Link>
    )
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4">
      <nav
        className={`bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl px-4 sm:px-6 py-4 max-w-7xl mx-auto transition-all duration-500 ${
          scrolled ? "shadow-3xl bg-white/98" : ""
        }`}
      >
        {/* Mobile & Tablet Header (Visible on < lg) */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PrepVerse
              </div>
              <div className="text-xs text-gray-500">Interview Tracker</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation (≥ lg) */}
        <div className="hidden lg:flex items-center justify-between relative">
          {/* Left Links */}
          <div className="flex gap-2">{primaryLinks.map((link) => renderNavLink(link))}</div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PrepVerse
              </h1>
              <p className="text-xs text-gray-500 font-medium">Interview Mastery</p>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex gap-2 items-center">
            {secondaryLinks.map((link) => renderNavLink(link))}

            <button className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors relative ml-2">
              
            </button>

            {/* Profile Dropdown */}
            <div className="relative group ml-2">
              <button className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                
                <div className="p-2">
                 
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Menu - FIXED VERSION */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-[80vh] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 pb-4 max-h-[70vh] overflow-y-auto">
            {/* Primary Links */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                Main Navigation
              </div>
              {primaryLinks.map((link) => renderNavLink(link, true))}
            </div>

            {/* Secondary Links */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                Tools & Analytics
              </div>
              {secondaryLinks.map((link) => renderNavLink(link, true))}
            </div>

            {/* Profile & Logout - ENHANCED VISIBILITY */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Account</div>

              

              {/* Logout Button - ENHANCED */}
              <div className="px-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 transition-all duration-300 shadow-sm border border-red-200/50"
                >
                  <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold  text-red-500">Sign Out</div>
                   
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
