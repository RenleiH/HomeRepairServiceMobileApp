import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import IPhoneFrame from './components/IPhoneFrame';
import AppIcon from './pages/AppIcon';
import SplashScreen from './pages/SplashScreen';
import MainSelection from './pages/MainSelection';
import Login from './pages/Login';
import RegisterHomeowner from './pages/RegisterHomeowner';
import RegisterProvider from './pages/RegisterProvider';
import HomeownerDashboard from './pages/HomeownerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import CreateOrder from './pages/CreateOrder';
import ServiceProviderList from './pages/ServiceProviderList';
import ActiveOrders from './pages/ActiveOrders';
import HomeownerProfile from './pages/HomeownerProfile';
import CompletedOrders from './pages/CompletedOrders';
import Reviews from './pages/Reviews';
import PaymentMethods from './pages/PaymentMethods';
import EstimateRequest from './pages/EstimateRequest';
import ProviderReviews from './pages/ProviderReviews';
import ProviderRequests from './pages/ProviderRequests';
import ProviderActiveOrders from './pages/ProviderActiveOrders';
import ProviderHistory from './pages/ProviderHistory';
import ProviderPayments from './pages/ProviderPayments';
import ProviderAdvertising from './pages/ProviderAdvertising';
import ProviderProfile from './pages/ProviderProfile';
import AIChatbox from './pages/AIChatbox';

function App() {
  return (
    <AuthProvider>
      <Router>
        <IPhoneFrame>
          <Routes>
            <Route path="/" element={<AppIcon />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/main" element={<MainSelection />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/register/homeowner" element={<RegisterHomeowner />} />
            <Route path="/register/provider" element={<RegisterProvider />} />
            <Route path="/dashboard/homeowner" element={<HomeownerDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/service-providers/:serviceType" element={<ServiceProviderList />} />
            <Route path="/active-orders" element={<ActiveOrders />} />
            <Route path="/homeowner/profile" element={<HomeownerProfile />} />
            <Route path="/completed-orders" element={<CompletedOrders />} />
            <Route path="/my-reviews" element={<Reviews />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/estimate-request/:providerId" element={<EstimateRequest />} />
            <Route path="/ai-chat" element={<AIChatbox />} />
            
            {/* 服务提供商相关路由 */}
            <Route path="/provider/requests" element={<ProviderRequests />} />
            <Route path="/provider/active" element={<ProviderActiveOrders />} />
            <Route path="/provider/history" element={<ProviderHistory />} />
            <Route path="/provider/payments" element={<ProviderPayments />} />
            <Route path="/provider/advertising" element={<ProviderAdvertising />} />
            <Route path="/provider/reviews" element={<ProviderReviews />} />
            <Route path="/provider/profile" element={<ProviderProfile />} />
          </Routes>
        </IPhoneFrame>
      </Router>
    </AuthProvider>
  );
}

export default App;
