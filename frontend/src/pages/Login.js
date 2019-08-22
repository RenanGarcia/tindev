import React, { useState } from 'react';

import api from "../services/api";
import "./Login.css";
import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [username, setUserName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await api.post("/devs", { username });

    const { _id } = response.data;
    
    console.log(_id);

    // TODO: Não entrar na aplicação caso o usuário não exista
    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input 
          placeholder="Digite seu usuário do GitHub" 
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
