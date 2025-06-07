import './detail.css'
import { useRouter } from 'next/navigation';
import { Repository, userDetail } from "@/src/interfaces/users";
import ButtonFav from '@/src/components/ButtonFav';
import FolderIcon from '@/src/components/Icons/folderIcon';
import LinearLoader from '@/src/components/LinearLoader';
interface DetailProps {
    data: userDetail;
    isFavorite: boolean;
    toggleFavorite: () => void;
    repos?: Repository[];
}

export default function Detail({ data, repos, isFavorite, toggleFavorite }: DetailProps) {
    const router = useRouter()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES')
    }

    if (!data) {
        return <LinearLoader />
    }

    return (
        <div className="user-detail-container">
            <div className="profile-card">
                <div className="back-container">
                    <button onClick={() => router.back()} className="back-btn">
                        Volver
                    </button>
                    <ButtonFav isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
                </div>
                <img
                    src={data.avatar_url}
                    alt={data.login}
                    className="profile-avatar"
                />
                <h1 className="profile-name">
                    {data.name || data.login}
                </h1>
                <p className="profile-username">@{data.login}</p>
                {data.bio && <p className="profile-bio">{data.bio}</p>}

                <a
                    href={data.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    Ver en GitHub
                </a>
            </div>
            <div className="info-card">
                <h2 className="info-title">Información Personal</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>ID:</strong> {data.id}
                    </div>
                    <div className="info-item">
                        <strong>Tipo:</strong> {data.type}
                    </div>
                    <div className="info-item">
                        <strong>Repositorios públicos:</strong> {data.public_repos}
                    </div>
                    <div className="info-item">
                        <strong>Gists públicos:</strong> {data.public_gists}
                    </div>
                    <div className="info-item">
                        <strong>Seguidores:</strong> {data.followers}
                    </div>
                    <div className="info-item">
                        <strong>Siguiendo:</strong> {data.following}
                    </div>
                    <div className="info-item">
                        <strong>Cuenta creada:</strong> {formatDate(data.created_at)}
                    </div>
                    <div className="info-item">
                        <strong>Última actualización:</strong> {formatDate(data.updated_at)}
                    </div>
                    {data.location && (
                        <div className="info-item">
                            <strong>Ubicación:</strong> {data.location}
                        </div>
                    )}
                    {data.company && (
                        <div className="info-item">
                            <strong>Empresa:</strong> {data.company}
                        </div>
                    )}
                    {data.blog && (
                        <div className="info-item">
                            <strong>Blog:</strong>
                            <a href={data.blog} target="_blank" rel="noopener noreferrer">
                                {data.blog}
                            </a>
                        </div>
                    )}
                    {data.email && (
                        <div className="info-item">
                            <strong>Email:</strong> {data.email}
                        </div>
                    )}
                    {data.twitter_username && (
                        <div className="info-item">
                            <strong>Twitter:</strong> @{data.twitter_username}
                        </div>
                    )}
                    {data.hireable !== null && (
                        <div className="info-item">
                            <strong>Disponible para contratar:</strong> {data.hireable ? 'Sí' : 'No'}
                        </div>
                    )}
                </div>
            </div>
            <div className="repos-card">
                <h2 className="repos-title">Repositorios ({data.public_repos})</h2>
                <ul>
                    {repos && repos.map(repo => (
                        <li key={repo.id} className='ul-repo'>
                            <a
                                href={repo.html_url}
                                className='repo-item'
                                target="_blank"
                                rel="noopener noreferrer">
                                <FolderIcon />
                                <p>{repo.name}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                    Total de repositorios públicos: <strong>{data.public_repos}</strong>
                </p>
            </div>
            {isFavorite && (
                <div className="favorites-card">
                    <h2 className="favorites-title">Estado de Favorito</h2>
                    <p>✅ Este usuario está marcado como favorito</p>
                </div>
            )}
        </div>
    )
}