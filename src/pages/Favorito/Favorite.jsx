import React, { useEffect, useState } from "react"

function Favorito() {

  const [repositories, setRepositories] = useState([])
  //   CONSUMINDO API
  useEffect(() => {
    fetch('https://api.github.com/users/henriquemattia/repos')
      .then(res => res.json())
      .then(data => setRepositories(data))
  }, []) //deixando vazio o componente será atualizado somente uma vez "quando a pagina for carregada", entao nao importa qunatas vezs nossa variavel for alterada ele nao vai usar o useEffect! 

  // ALTERANDO TITULO DA PAGINA BASEADO NA QUANTIDADE DE REPOSITORIOS FAVORITADOS
  useEffect(()=>{
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos`

  },[repositories])


  // FUNÇÃO DE ADICIONAR AOS FAVORITOS
  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })
    setRepositories(newRepositories)
  }

  return (
    <>
      <ul>
        <li>
          {repositories.map((repo) => {
            return (
              <li key={repo.id}>
                <h1>{repo.name} {repo.favorite && <span>(Favoritado)</span>}</h1>


                <h2>{repo.description}</h2>
                <p>Clique <a href={repo.html_url} target='blank'>aqui</a> para ver o projeto no github</p>

                <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
                <br />
              </li>
            )
          })}
        </li>
      </ul>
    </>
  )
}

export default Favorito
