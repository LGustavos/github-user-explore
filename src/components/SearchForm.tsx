import { useState } from 'react'
import type { FormEvent } from 'react'

interface SearchFormProps {
  onSubmit: (username: string) => void
  initialValue?: string
}

const SearchForm = ({ onSubmit, initialValue = '' }: SearchFormProps) => {
  const [value, setValue] = useState(initialValue)
  const [touched, setTouched] = useState(false)

  const trimmed = value.trim()
  const invalid = touched && trimmed.length === 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    if (trimmed.length === 0) return
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="username" className="form-label eyebrow mb-2">
        Username
      </label>
      <div className="input-group input-group-lg has-validation">
        <input
          id="username"
          type="text"
          placeholder="ex.: torvalds"
          autoComplete="off"
          className={`form-control search-field${invalid ? ' is-invalid' : ''}`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => setTouched(true)}
        />
        <button type="submit" className="btn btn-ink px-4">
          Buscar
        </button>
        <div className="invalid-feedback">Informe um nome de usuário.</div>
      </div>
    </form>
  )
}

export default SearchForm
