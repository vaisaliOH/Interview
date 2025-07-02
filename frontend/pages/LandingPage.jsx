import React from "react"
import { Link } from "react-router-dom"
import {
  BookOpen,
  BarChart3,
  Clock,
  Building2,
  Plus,
  Eye,
  Edit,
  Trash2,
  Target,
  Timer,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react"

const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-8 py-3 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => <div className={`p-6 pb-4 ${className}`}>{children}</div>

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-2 ${className}`}>{children}</p>
)

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
)

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200">
      {/* Navigation */}
      <nav className=" bg-gradient-to-br from-indigo-200 via-indigo-00 to-purple-200 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PrepVerse
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-170 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800">🚀 Your Interview Success Platform</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Interview Game
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Track, analyze, and conquer your interview preparation with our comprehensive platform. From question
                  management to company-specific mock tests, we've got you covered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                  >
                    Start Preparing Now
                  </Button>
                </Link>
                
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  
                </div>
                <div className="flex items-center space-x-2">
                  
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Question Bank</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Question
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Two Sum Problem</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">Easy</Badge>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Google</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Given an array of integers, return indices of two numbers...
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        
                        <div className="flex space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <Edit className="h-3 w-3 text-gray-400" />
                          <Trash2 className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Binary Tree Traversal</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <Badge className="bg-purple-100 text-purple-800 text-xs">Amazon</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Implement inorder, preorder, and postorder traversal...</p>
                      <div className="flex items-center justify-between mt-2">
                        
                        <div className="flex space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <Edit className="h-3 w-3 text-gray-400" />
                          <Trash2 className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">System Design: Chat App</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-red-100 text-red-800 text-xs">Hard</Badge>
                          <Badge className="bg-gray-100 text-gray-800 text-xs">Meta</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Design a scalable chat application like WhatsApp...</p>
                      <div className="flex items-center justify-between mt-2">
                  
                        <div className="flex space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <Edit className="h-3 w-3 text-gray-400" />
                          <Trash2 className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-purple-100 text-purple-800">Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Everything You Need to Ace Your Interviews</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to track, analyze, and master your interview
              preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Question Management */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <BookOpen className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Question Management</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Effortlessly add, view, edit, and delete interview questions with our intuitive interface.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Plus className="h-4 w-4 text-blue-600" />
        Add
      </span>
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Eye className="h-4 w-4 text-blue-600" />
        View
      </span>
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Edit className="h-4 w-4 text-blue-600" />
        Edit
      </span>
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Trash2 className="h-4 w-4 text-blue-600" />
        Delete
      </span>
      
    </div>
  </CardContent>
</Card>


            {/* Data Analytics */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <BarChart3 className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Smart Analytics</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Track question difficulty, completion status, and performance metrics with detailed analytics.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        Analytics
      </span>
      <span className="ml-auto text-xs italic text-blue-800">
        Difficulty tracking & status monitoring
      </span>
    </div>
  </CardContent>
</Card>


            {/* Revision Mode */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <Clock className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Revision Mode</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Interactive flashcards with built-in timer for efficient revision and memory retention.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Timer className="h-4 w-4 text-blue-600" />
        Flashcards
      </span>
      <span className="ml-auto text-xs italic text-blue-800">
        Timed flashcard sessions
      </span>
    </div>
  </CardContent>
</Card>


            {/* Mock Tests */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <Building2 className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Company Mock Tests</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Practice with company-specific mock tests tailored to real interview scenarios.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <Target className="h-4 w-4 text-blue-600" />
        Practice
      </span>
      <span className="ml-auto text-xs italic text-blue-800">
        Company-specific preparation
      </span>
    </div>
  </CardContent>
</Card>


            {/* Progress Tracking */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <TrendingUp className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Progress Tracking</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Monitor your improvement over time with detailed progress reports and insights.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <BarChart3 className="h-4 w-4 text-blue-600" />
        Reports
      </span>
      <span className="ml-auto text-xs italic text-blue-800">
        Comprehensive progress reports
      </span>
    </div>
  </CardContent>
</Card>


            {/* Smart Organization */}
<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
  <CardHeader className="pb-2">
    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
      <Users className="h-7 w-7 text-indigo-600" />
    </div>
    <CardTitle className="text-xl font-bold text-indigo-800">Smart Organization</CardTitle>
    <CardDescription className="text-sm text-gray-700">
      Organize questions by difficulty, company, topic, and status for efficient preparation.
    </CardDescription>
  </CardHeader>

  <CardContent className="pt-2">
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm">
        <BookOpen className="h-4 w-4 text-blue-600" />
        Categorized
      </span>
      <span className="ml-auto text-xs italic text-blue-800">
        Advanced categorization
      </span>
    </div>
  </CardContent>
</Card>
</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-170 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful candidates who used PrepVerse to land their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PrepVerse</span>
              </div>
              <p className="text-gray-400 flex items-center " >Your ultimate interview preparation platform.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PrepVerse</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
