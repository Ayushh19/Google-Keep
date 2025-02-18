


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/login';
// import Signup from './pages/signup';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* Redirect root to login by default */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthorizedRoute from './routes/AuthorizedRoute';

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect root to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


