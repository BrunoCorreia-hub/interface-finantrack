import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Activity, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinks {
  name: string;
  path: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { authState, signOut } = useAuth();

  const { pathname } = useLocation();
  const isAuthenticade: boolean = !!authState.user;

  const navLink: NavLinks[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" },
  ];

  const renderAvatar = () => {
    if (!authState.user) return null;

    if (authState.user.photoURL) {
      return (
        <img
          src={authState.user.photoURL}
          alt={`Foto de perfil do(a) ${authState.user.displayName}`}
          className="w-12 h-12 rounded-full border border-gray-700"
        />
      );
    }

    return (
      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-semibold">
        {authState.user.displayName?.charAt(0)}
      </div>
    );
  };

  const handleSigOut = () => {
    signOut();
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-500 fixed w-full top-0 z-999">
      <div className="container-app">
        <div className="flex justify-between items-center py-4">
          {/*Logo devbills*/}
          <Link
            to="/"
            className="text-primary-500 flex gap-1.5 text-xl font-bold hover:text-green-700 transition-all"
          >
            <Activity />
            DevBills
          </Link>

          {isAuthenticade && (
            <nav className="hidden md:flex space-x-3">
              {navLink.map((nav) => (
                <Link
                  key={nav.path}
                  to={nav.path}
                  className={`font-bold transition-colors border-b-4 rounded-b-xl px-3 text-sm 
                ${pathname === nav.path ? "text-primary-500 border-primary-500" : "text-white border-none"} hover:opacity-45 transition-all`}
                >
                  {nav.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="hidden md:flex space-x-4">
            {isAuthenticade && (
              <div className="flex items-center gap-1.5">
                {renderAvatar()}
                <div className="w-full flex gap-2 items-center">
                  <p className="text-gray-100 text-sm">
                    Olá,{" "}
                    <span className="text-primary-500 text-sm font-semibold">
                      {authState.user?.displayName}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={handleSigOut}
                    className="text-red-500 text-sm rounded-2xl cursor-pointer hover:translate-x-0.5 transition-all hover:text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/*botao mobile*/}
          <div className="md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="text-gray-100 rounded-xl transition ease-in-out cursor-pointer"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {isAuthenticade ? (
              <>
                <div className="flex justify-between px-4 py-2 border-t border-b border-gray-600">
                  <div className="flex items-center gap-2.5">
                    {renderAvatar()}
                    <span className="text-gray-50 text-xl font-semibold">
                      {authState.user?.displayName}
                    </span>
                  </div>
                  <button type="button" onClick={handleSigOut}>
                    <LogOut className="text-red-600 cursor-pointer hover:opacity-40" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navLink.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-2 py-1 rounded-sm text-gray-50 font-medium 
                      ${pathname === link.path ? "text-primary-500 bg-gray-700" : "text-white"} transition-colors`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </>
            ) : (
              <Link to="/login">Logar</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
