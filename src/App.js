import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post(`/repositories`, {
      "title": `Projeto GoSatck 13 IV ${Date.now()}`,
	    "url": "https://github.com/douggomes/goStack13-desafio-conceitos-ReactJS",
      "techs": [
        "reactJs",
        "nodeJs",
        "react Native"
      ]
    }).then(response => {
      if(response.status === 200){
        setRespositories([...repositories, response.data]);
      }
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if(response.status === 204) {
        const repos = repositories.filter((repository) => repository.id !== id);
        setRespositories(repos);
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
