import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AppLayout from "../layout/AppLayout";
import Transactions from "../pages/Transactions";
import TransactionForm from "../pages/TransactionForm";
import { ToastContainer, type ToastContainerProps } from "react-toastify";

const AppRoutes = () => {
  const toastConfig: ToastContainerProps = {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>Pagina nao encontrada</h2>} />

          <Route element={<PrivateRoutes />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transacoes" element={<Transactions />} />
              <Route path="/transacoes/nova" element={<TransactionForm />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer {...toastConfig} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
