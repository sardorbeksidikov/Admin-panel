import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./components/Auth";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Add from './components/Add';
import Edit from "./components/Edit";
import Dashboard from './components/Dashboard/Dashboard';
import Title from './components/Dashboard/Title';
import Main from './components/teachers/Main';
import EditTeacher from './components/teachers/EditTeacher';
import AddTeacher from './components/teachers/AddTeacher';

const App = () => {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/add" element={<Add />} />
            <Route path="/add" element={<AddTeacher />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/edit/:id" element={<EditTeacher />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
