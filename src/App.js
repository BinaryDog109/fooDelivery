import './css/App.css';
import React from "react"
import Signup from "./auth/Signup"
import { Container } from "react-bootstrap"
import {AuthProvider, useAuth} from "./auth/AuthContext"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./auth/Login"
import ForgotPassword from "./auth/ForgotPassword"
import UpdateProfile from "./UpdateProfile"

// If the user is logged in, go on and display the component in question;
function PrivateRoute ({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const currentUser  = useAuth();
//
//   return (
//       <Route
//           {...rest}
//           render={props => {
//             return currentUser ? <Component {...props} /> : <Navigate to="/login" />
//           }}
//       ></Route>
//   )
// }

function App() {
  return (
      <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
                <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile/> </PrivateRoute>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )
}

export default App;
