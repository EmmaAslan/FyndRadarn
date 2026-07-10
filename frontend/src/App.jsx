import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Header&Footer/Footer.jsx";
import Header from "./components/Header&Footer/Header.jsx";
// import Login from "./pages/Login/Login.jsx";
// import Signup from "./pages/Signup/Signup.jsx";
// import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// import Watchlist from "./pages/Watchlist/Watchlist.jsx";
// import AddProduct from "./pages/AddProduct/AddProduct.jsx";
// import Settings from "./pages/Settings/Settings.jsx";
import StartPage from "./pages/StartPage/StartPage.jsx";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/settings" element={<Settings />} /> */}
          <Route path="/" element={<StartPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
