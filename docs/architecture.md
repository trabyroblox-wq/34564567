# SUB v1 Proxy Architecture

## Folders & Responsibilities

- `backend/src/middleware/` → cross-cutting concerns (security, rate limiting, logging)
- `backend/src/routes/`    → domain routes (proxy, health, future admin/api)
- `backend/src/utils/`     → shared helpers
- `backend/config/`        → configuration (env-based)
- `frontend/public/`       → static files served by backend or CDN
- `frontend/assets/`       → images, icons, fonts

## Flow

1. User opens frontend → types URL → clicks GO
2. Frontend redirects to `/p/<encoded-url>`
3. Backend receives request → strips dangerous headers
4. `http-proxy-middleware` forwards request to real target
5. Response streams back through proxy → user sees site

## Security considerations

- Helmet headers
- CORS restricted to known origins
- Rate limiting per IP
- No request body/body parsing for large uploads (streaming)
