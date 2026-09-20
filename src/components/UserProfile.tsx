import { ExternalLinkIcon } from './icons.tsx'
import { avatarUrl } from '../utils/avatar.ts'
import type { GitHubUser } from '../types/github.ts'

interface UserProfileProps {
  user: GitHubUser
}

const UserProfile = ({ user }: UserProfileProps) => {
  const displayName = user.name || user.login

  return (
    <div className="profile-sticky">
      <img
        src={avatarUrl(user.avatar_url, 360)}
        alt={`Avatar de ${displayName}`}
        className="profile-avatar mb-3"
        width="180"
        height="180"
      />

      <h1 className="h3 tight fw-semibold mb-1">{displayName}</h1>
      <p className="mono text-body-secondary mb-3">@{user.login}</p>

      {user.bio && <p className="mb-3">{user.bio}</p>}

      <dl className="spec-list mb-3">
        <div className="spec-row">
          <dt className="spec-label">Seguidores</dt>
          <dd className="spec-value mb-0">{user.followers.toLocaleString('pt-BR')}</dd>
        </div>
        <div className="spec-row">
          <dt className="spec-label">Seguindo</dt>
          <dd className="spec-value mb-0">{user.following.toLocaleString('pt-BR')}</dd>
        </div>
        {user.email && (
          <div className="spec-row">
            <dt className="spec-label">E-mail</dt>
            <dd className="spec-value mb-0 text-break">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </dd>
          </div>
        )}
      </dl>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-ink w-100 d-inline-flex align-items-center justify-content-center gap-2"
      >
        Ver perfil no GitHub <ExternalLinkIcon size={13} />
      </a>
    </div>
  )
}

export default UserProfile
