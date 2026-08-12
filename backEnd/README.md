Run the backend with a local MySQL container (recommended)

1. Ensure Docker and docker-compose are installed.
2. From the `backEnd` folder run:

```bash
docker-compose up -d
```

This starts a MySQL 8 container and initializes the database using `banco.sql`.

3. Start the Node server (in `backEnd`):

```bash
npm install
node app.js
```

Notes
- `db.js` reads connection settings from environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- With the compose file above, use `DB_HOST=db`, `DB_USER=root`, `DB_PASSWORD=root`, `DB_NAME=banco` if you need to connect externally.
