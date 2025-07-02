import React from "react"
import { Link } from "react-router-dom"
import {
  Plus,
  Eye,
  BarChart3,
  Brain,
  Building2,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
} from "lucide-react"
import Navbar from "../components/Navbar"

const Home = () => {
  

  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto mb-16">
          

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Interviews
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                with Confidence
              </span>
              <span className="text-4xl md:text-6xl">🧠</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Track your coding questions, organize by topic or company, and mark your progress easily. Your personal
              interview prep companion — clean, fast, and effective!
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Level Up Your Interview Skills?</h2>
            <p className="text-xl mb-6 text-blue-100">Start adding questions and tracking your progress today!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/add"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Add Your First Question
              </Link>
              <Link
                to="/revision"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white text-lg px-8 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                <Brain className="w-5 h-5" />
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
