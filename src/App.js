


// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Archive from "./components/Archive";
import NoteInput from "./components/NoteInput";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import Trash from "./components/trash";
import EditLabels from "./components/EditLabel";
import ReminderNotes from "./components/ReminderNotes";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Authorized Routes - Only for non-authenticated users */}
        <Route element={<AuthorizedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes - Only for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<NoteInput />} />
            <Route path="archive" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
            <Route path="edit-labels" element={<EditLabels />} />
            <Route path="reminders" element={<ReminderNotes />} />
          </Route>
        </Route>

        {/* Redirect root to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;