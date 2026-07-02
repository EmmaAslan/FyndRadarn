import './App.css'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'

function App() {


  return (
    <div className="app">

      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App
