import './rateLimit.css'

export default function RateLimitPage() {
    return (
        <div className="container">
            <div>
                <h1>⚠️ UPS - GitHub Falló Por Rate Limit ⚠️</h1>
                <p>Has alcanzado el límite de peticiones a la API de GitHub.</p>
                <p>Por favor, intentá nuevamente más tarde.</p>
            </div>
        </div>
    );
}
