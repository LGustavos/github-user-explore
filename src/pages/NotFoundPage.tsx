import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div className="row py-lg-4">
      <title>Página não encontrada · GitHub User Explore</title>

      <div className="col-12 col-lg-9 col-xl-7">
        <p className="eyebrow mb-3">Erro 404</p>
        <h1 className="hero-title tight mb-3">Página não encontrada.</h1>
        <p className="measure text-body-secondary mb-4">
          O endereço acessado não corresponde a nenhuma rota desta aplicação.
        </p>
        <Link to="/" className="btn btn-ink px-4">
          Voltar para a busca
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
