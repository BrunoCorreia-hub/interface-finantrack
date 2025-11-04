import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { signWithGoogle, authState } = useAuth();
  const handleLogin = async () => {
    try {
      await signWithGoogle();
    } catch {
      toast.error("Erro ao acessar informações");
    }
  };

  useEffect(() => {
    if (authState.user && !authState.loading) {
      navigate("/dashboard");
    }
  }, [authState.user, authState.loading, navigate]);

  return (
    <div className="bg-gray-200 min-h-screen p-10 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-5">DevBills</h1>
          <p className="text-center text-lg text-gray-700 mb-5">
            Gerencia suas finanças de forma simples e eficiente
          </p>
        </header>
        <main className="mt-8 bg-white p-15 rounded-xl shadow-md py-8 px-4 sm:px-10 space-y-6">
          <section>
            <h2 className="text-lg text-gray-950 font-medium mb-2">Faça login para continuar</h2>
            <p className="text-sm text-gray-500 mb-6">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
          </section>
          <GoogleLoginButton onClick={handleLogin} isLoading={false} />
          {authState.error && (
            <div className="bg-red-50 text-center text-red-700 mt-3.5">
              <p>{authState.error}</p>
            </div>
          )}
          <footer className="mt-5 text-center text-sm text-gray-500">
            Ao fazer login, você concorda com nossos termos de uso e politica de privacidade.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
