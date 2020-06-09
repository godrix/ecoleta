import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import assets from "../../constants/assets";
import app from "../../constants/app";
import { Container } from "./styles";

const Home: React.FC = () => {
  return (
    <Container>
      <div className="content">
        <header>
          <img src={assets.logo} alt={app.app_name} />
        </header>
        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </Container>
  );
};

export default Home;
