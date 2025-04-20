import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Welcome to our React application!</p>
    </div>
  )
}

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">This is the about page of our application.</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-4xl mx-auto px-4">
            <ul className="flex space-x-8 py-4">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
