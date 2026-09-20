interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

const ErrorMessage = ({
  title = 'Ocorreu um erro',
  message,
  onRetry
}: ErrorMessageProps) => {
  return (
    <div className="state-block">
      <div className="panel state-card p-4 p-md-5">
        <p className="eyebrow mb-2">Falha</p>
        <h2 className="h5 tight fw-semibold mb-2">{title}</h2>
        {message && <p className="text-body-secondary mb-4">{message}</p>}
        {onRetry && (
          <button
            type="button"
            className="btn btn-outline-ink btn-sm"
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
