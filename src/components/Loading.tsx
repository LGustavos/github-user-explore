interface LoadingProps {
  label?: string
}

const Loading = ({ label = 'Carregando...' }: LoadingProps) => {
  return (
    <div className="state-block" role="status">
      <span className="spinner-border" />
      <span className="eyebrow mt-3">{label}</span>
    </div>
  )
}

export default Loading
