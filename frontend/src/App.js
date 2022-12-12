import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewTicket from "./pages/NewTicket";
import { useSelector } from "react-redux";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/new-ticket"
              element={
                user ? (
                  <NewTicket />
                ) : (
                  <Navigate to="/login" element={<Login />} />
                )
              }
            />
            <Route
              path="/tickets"
              element={
                user ? (
                  <Tickets />
                ) : (
                  <Navigate to="/login" element={<Login />} />
                )
              }
            />
            <Route
              path="/ticket/:ticketId"
              element={
                user ? <Ticket /> : <Navigate to="/login" element={<Login />} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
