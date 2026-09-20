const SORT_OPTIONS = [
  { value: 'stars-desc', label: 'Estrelas: maior para menor' },
  { value: 'stars-asc', label: 'Estrelas: menor para maior' },
  { value: 'name-asc', label: 'Nome: A-Z' },
  { value: 'name-desc', label: 'Nome: Z-A' }
] as const

export type SortMode = (typeof SORT_OPTIONS)[number]['value']

interface RepositorySortProps {
  value: SortMode
  onChange: (mode: SortMode) => void
}

const RepositorySort = ({ value, onChange }: RepositorySortProps) => {
  return (
    <div>
      <label htmlFor="repo-sort" className="form-label eyebrow d-block mb-1">
        Ordenar
      </label>
      <select
        id="repo-sort"
        className="form-select form-select-sm w-auto"
        value={value}
        onChange={(event) => onChange(event.target.value as SortMode)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RepositorySort
