import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home/Home";
import { Casestudy_page } from "./components/casestudy/page";
import Aboutus_page from "./components/aboutus/page";
import Footer from "./components/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ScrollToTop from "./components/scroll";
import ContactSubmissions from "@/components/fetchdata";
import JoinWithUs from "./components/sales";
import Sales_dashbord from "./components/Sales_Pannel/Dashbord/dashbord";
import Portfolio from "./components/project_pannel/portfolio";

// Hardcoded default credentials
const DEFAULT_ADMIN_CREDENTIALS = {
  username: "terracode",
  password: "dev@2022",
};

const DEFAULT_SALES_CREDENTIALS = {
  username: "terracodesales",
  password: "sales@2022",
};

// Authentication functions
const isAuthenticated = () => {
  return localStorage.getItem("adminLoggedIn") === "true" || localStorage.getItem("salesLoggedIn") === "true";
};

const isSalesAuthenticated = () => {
  return localStorage.getItem("salesLoggedIn") === "true";
};

// ProtectedRoute component
import { ReactElement } from "react";
import Home1 from "./components/Sales_Pannel/Dashbord/DHome";
import ContactForm from "./components/contactus/Contact";

const ProtectedRoute = ({ element, authType = "admin" }: { element: ReactElement; authType?: string }) => {
  if (authType === "sales") {
    return isSalesAuthenticated() ? element : <Navigate to="/sales-login" replace />;
  }
  return isAuthenticated() ? element : <Navigate to="/admin-login" replace />;
};

// Admin Login Component
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (
      username === DEFAULT_ADMIN_CREDENTIALS.username &&
      password === DEFAULT_ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin <span className="bg-gradient-to-r from-[#EF3D00] via-[#FDA40A] to-[#EF3D00] bg-clip-text text-transparent">Login</span></h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#EF3D00] to-[#FDA40A] text-white py-2 px-4 rounded hover:from-[#D32D00] hover:to-[#C78507] transform transition-transform duration-300 hover:scale-105"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

// Sales Login Component
const SalesLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (
      username === DEFAULT_SALES_CREDENTIALS.username &&
      password === DEFAULT_SALES_CREDENTIALS.password
    ) {
      localStorage.setItem("salesLoggedIn", "true");
      window.location.href = "/sales-dashbord";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sales Panel <span className="bg-gradient-to-r from-[#EF3D00] via-[#FDA40A] to-[#EF3D00] bg-clip-text text-transparent">Login</span></h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#EF3D00] to-[#FDA40A] text-white py-2 px-4 rounded hover:from-[#D32D00] hover:to-[#C78507] transform transition-transform duration-300 hover:scale-105"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const location = useLocation();
  const adminRoutes = ["/admin", "/admin-login"];
  const salesRoutes = [
    "/sales-dashbord",
    "/sales-login",
    "/sales-dashbord/home",
    "/sales-dashbord/inbox",
    "/sales-dashbord/calendar",
    "/sales-dashbord/search",
    "/sales-dashbord/settings"
  ];
  const isAdminRoute = adminRoutes.includes(location.pathname);
  const isSalesRoute = salesRoutes.includes(location.pathname);

  const globalSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Terracode",
    url: "https://www.terracodedev.com",
    logo: "https://www.terracodedev.com/logo.png",
    description:
      "Terracode is a premier software development company specializing in custom solutions for businesses, startups, and enterprises.",
    sameAs: [
      "https://www.linkedin.com/company/terracode",
      "https://twitter.com/terracode",
      "https://github.com/terracode",
    ],
  };

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script type="application/ld+json">
            {JSON.stringify(globalSchemaMarkup)}
          </script>
        </Helmet>
        <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
        {!isAdminRoute && !isSalesRoute && (
  <Navbar setIsContactFormOpen={setIsContactFormOpen} />
)}
        <ScrollToTop />
        
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus_page />} />
          <Route path="/casestudy" element={<Casestudy_page />} />
          <Route path="/sales" element={<JoinWithUs />} />
          <Route path="/digitalportfolio" element={<Portfolio />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<ContactSubmissions />} />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/sales-login" element={<SalesLogin />} />
          <Route
            path="/sales-dashbord"
            element={
              <ProtectedRoute 
                element={<Sales_dashbord />} 
                authType="sales" 
              />
            }
          >
            <Route index element={<Home1 />} />
            <Route path="inbox" element={<div>Inbox Content</div>} />
            <Route path="calendar" element={<div>Calendar Content</div>} />
            <Route path="search" element={<div>Search Content</div>} />
            <Route path="settings" element={<div>Settings Content</div>} />
          </Route>
          
        </Routes>

        {!isAdminRoute && !isSalesRoute && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;