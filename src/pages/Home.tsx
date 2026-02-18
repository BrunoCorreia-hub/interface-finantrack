import type { JSX } from "react";
import Button from "../components/Button";
import { Wallet, TrendingUp, List, CreditCard } from "lucide-react";
import { useNavigate } from "react-router";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();

  const features: ReadonlyArray<Feature> = [
    {
      icon: <Wallet className="w-8 h-8 text-primary-700" />,
      title: "Controle Financeiro",
      description:
        "Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-700" />,
      title: "Relatórios",
      description: "Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
    },
    {
      icon: <List className="w-8 h-8 text-primary-700" />,
      title: "Categorias Personalizadas",
      description: "Organize suas transações em categorias para melhor análise.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-700" />,
      title: "Transações Ilimitadas",
      description:
        "Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.",
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen pb-8">
      <div className="container-app">
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Gerencie suas finanças com o{" "}
                <span className="text-5xl md:text-6xl bg-gradient-to-r from-[#007BFF] via-[#00D1FF] to-[#3CFD5B] bg-clip-text text-transparent">
                  FinanTrack
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-5">
                Uma plataforma simples e eficiente para controlar suas despesas e receitas. Organize
                suas finanças pessoais ou do seu negócio com facilidade.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="text-center px-6 py-3" onClick={() => navigate("/login")}>
                  Começar agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-12 bg-gray-800 rounded-md mb-15 md:py-20">
          <div className="container-app">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">
                Recursos do FinanTrack
              </h2>
              <p className="text-lg text-white max-w-2xl mx-auto mb-5">
                Nossa plataforma oferece tudo o que você precisa para manter suas finanças
                organizadas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map((feature) => (
                  <div key={feature.title} className="bg-gray-900 p-6 rounded-xl hover:shadow-lg">
                    <div className="bg-gray-950 rounded-full inline-block p-3 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-white p-4 text-2xl font-bold">{feature.title}</h3>
                    <p className="text-white ">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-12 bg-gray-800 rounded-md md:py-15">
          <div className="flex flex-col items-center">
            <h4 className="text-2xl md:text-3xl text-white font-bold mb-5">
              Pronto para organiza suas finanças?
            </h4>
            <p className="text-white max-w-2xl text-center mb-5">
              Comece a usar o FinanTrack hoje mesmo e tenha o controle total sobre seu dinheiro. É
              gratuito e fácil de usar.
            </p>
            <Button onClick={() => navigate("/login")}>Criar Conta Gratuita</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
