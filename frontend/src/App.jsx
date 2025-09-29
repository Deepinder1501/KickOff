import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import SearchGames from "./pages/SearchGames";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyEvents from "./pages/MyEvents";

import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/searchgames" element={<SearchGames />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/my-events" element={<MyEvents />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;