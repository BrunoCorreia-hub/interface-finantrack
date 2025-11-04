import linkedin from "../assets/linkedin.png";
import gmail from "../assets/gmail.png";
import github from "../assets/git.png";
import whatsapp from "../assets/whatzap.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-10 mt-10">
      <div className="grid grid-cols-1 p-10 md:grid-cols-3 gap-7">
        <div>
          <h3 className="text-gray-500 font-semibold text-2xl mb-3">Sobre</h3>
          <p className="text-gray-50">
            O DevBills ajuda você a gerenciar suas finanças com praticidade. Controle despesas,
            receitas e mantenha o equilíbrio financeiro em um só lugar.
          </p>
        </div>

        <div>
          <h3 className="text-gray-500 font-semibold text-2xl mb-3">Navegação</h3>
          <ul>
            <li>
              <Link to="/" className="text-gray-50 text-sm hover:opacity-50">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-50 text-sm hover:opacity-50">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/transacoes" className="text-gray-50 text-sm hover:opacity-50">
                Transações
              </Link>
            </li>
            <li>
              <Link to="/transacoes/nova" className="text-gray-50 text-sm hover:opacity-50">
                Nova Transação
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-500 font-semibold mb-4 text-2xl">Contatos</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="mailto:brunocorreia712@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-50"
              >
                <img src={gmail} alt="icone-gmail" className="w-4 h-4" />
                brunocorreia712@gmail.com
              </Link>
            </li>
            <li>
              <Link
                to="https://wa.me/5561998032785"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-50"
              >
                <img src={whatsapp} alt="icone-whatsapp" className="w-4 h-4" />
                Whatsapp
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/BrunoCorreia-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-50"
              >
                <img src={github} alt="icone-github" className="w-4 h-4" />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/bruno-correia-oliveira"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-50"
              >
                <img src={linkedin} alt="icone-linkedin" className="w-4 h-4" />
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DevBills. Desenvolvido por{" "}
        <span className="text-white font-medium">Bruno Correia</span>.
      </div>
    </footer>
  );
};

export default Footer;
