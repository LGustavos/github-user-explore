import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { SearchForm } from '../components/index.ts'
import heroImage from '../assets/octocat-inspector.webp'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    import('./UserPage.tsx')
  }, [])

  const handleSearch = (username: string) => {
    navigate(`/user/${encodeURIComponent(username)}`)
  }

  return (
    <div className="row align-items-center g-5 py-lg-4">
      <title>GitHub User Explore</title>

      <div className="col-12 col-lg-6">
        <p className="eyebrow mb-3">Busca de perfis</p>
        <h1 className="hero-title tight mb-3">
          Veja quem está por trás
          <br className="d-none d-sm-inline" />
          dos repositórios.
        </h1>
        <p className="measure text-body-secondary mb-4">
          Informe um username do GitHub para consultar o perfil público e percorrer a
          lista de repositórios, ordenando por estrelas ou nome.
        </p>

        <div className="measure">
          <SearchForm onSubmit={handleSearch} />
        </div>
      </div>

      <div className="col-lg-6 d-none d-lg-block">
        <img
          src={heroImage}
          alt="Mascote do GitHub caracterizado como detetive, segurando uma lupa"
          className="hero-image"
          width="896"
          height="896"
        />
      </div>
    </div>
  )
}

export default HomePage
