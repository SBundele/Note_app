# Note_app_backend

Backend of Note App using django rest_framework

## Local setup

Run the backend from `notes/`:

```powershell
python manage.py migrate
python manage.py runserver
```

Run the frontend from `frontend/note-app/`:

```powershell
npm install
npm run dev
```

For deployment, configure the environment variables documented in
`notes/.env.example` and `frontend/note-app/.env.example`.
