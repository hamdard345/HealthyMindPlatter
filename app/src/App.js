import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Track from "./components/Track";
import Signin from "./components/Signin";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import { Signup } from "./components/Signup";
import AllActivity from "./components/AllActivity";
import Report from "./components/Report";
/**
 * App
 *
 * @author Noorullah Niamatullah w18002720
 */
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const handleAuthenticated = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
  };
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/track"
            element={
              <Track
                authenticated={authenticated}
                handleAuthenticated={handleAuthenticated}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Signin
                authenticated={authenticated}
                handleAuthenticated={handleAuthenticated}
              />
            }
          />
          <Route
            path="/allactivity"
            element={
              <AllActivity
                authenticated={authenticated}
                handleAuthenticated={handleAuthenticated}
              />
            }
          ></Route>
          <Route
            path="/report"
            element={
              <Report
                authenticated={authenticated}
                handleAuthenticated={handleAuthenticated}
              />
            }
          ></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
