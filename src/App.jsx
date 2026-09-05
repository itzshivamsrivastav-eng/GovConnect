import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import MockPortal from './pages/MockPortal';
import Schemes from './pages/Schemes';
import SchemeDetail from './pages/SchemeDetail';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Consent from './pages/Consent';
import Grievances from './pages/Grievances';
import Help from './pages/Help';
import Officer from './pages/Officer';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>

          {/* Public pages */}
          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/officer"
            element={<Officer />}
          />

          {/* Public browsing */}
          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/services/:id"
            element={<ServiceDetail />}
          />

          <Route
            path="/schemes"
            element={<Schemes />}
          />

          <Route
            path="/schemes/:id"
            element={<SchemeDetail />}
          />

          {/* Protected citizen routes */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mock-portal/:serviceId"
            element={
              <ProtectedRoute>
                <MockPortal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consent"
            element={
              <ProtectedRoute>
                <Consent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/grievances"
            element={
              <ProtectedRoute>
                <Grievances />
              </ProtectedRoute>
            }
          />

          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Landing />}
          />

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;