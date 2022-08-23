import React, { useEffect, useState } from "react"

function Repositorio() {

  const [repositories, setRepositories] = useState([]) 

  useEffect(()=>{
    fetch('https://api.github.com/users/henriquemattia/repos')
      .then(res => res.json())
      .then(data=>setRepositories(data))
      }, []) //deixando vazio o componente será atualizado somente uma vez "quando a pagina for carregada", entao nao importa qunatas vezs nossa variavel for alterada ele nao vai usar o useEffect! 


  return (
    <>
      <ul>
        <li>
          {repositories.map((repo)=>{
            return (
              <li key={repo.id}>
                <h1>{repo.name}</h1>
                <h2>{repo.description}</h2>
                <p>Clique <a href={repo.html_url} target='blank'>aqui</a> para ver o projeto no github</p>
                <br />
              </li>
            )
          })}
        </li>
      </ul>
    </>
  )
}

export default Repositorio
