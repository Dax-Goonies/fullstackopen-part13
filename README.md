# Full Stack Open — Part 13: Using Relational Databases with Sequelize

A blog application backend built with Express, Sequelize, and PostgreSQL, covering relational modeling, migrations, authentication, server-side sessions, and a many-to-many relationship feature (Blog, User, ReadingList).

## 📦 What's here

- **PostgreSQL** via Docker, with all schema changes managed through Sequelize migrations (`migrations/`), never `.sync()`.
- **Models** (`models/`): `Blog`, `User`, `ReadingList` (join table), `Session`.
- **Controllers** (`controllers/`): `blogs`, `users`, `login`, `logout`, `readinglists`, `authors`, `reset`.
- **Authentication**: JWT-based, with server-side session validation — logging out (or disabling a user) immediately revokes access, even with a technically valid token.
- **Reading list**: a many-to-many relationship between users and blogs, tracking per-user read/unread status.
- **Tests**: an official test suite (`tests/`), run against a dedicated test database, with a matching GitHub Actions workflow (`.github/workflows/test.yml`).

## 🛠️ Running

**1. Start Postgres:**
```bash
docker run -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres
```

**2. Open a `psql` console (optional, for inspecting the database directly):**
```bash
docker run -it --rm postgres psql "postgres://postgres:yourpassword@host.docker.internal:5432/postgres"
```

**3. Start the app (applies pending migrations automatically):**
```bash
npm run dev
```

**4. Seed sample data (two users, blogs, and reading list entries):**
```bash
npm run seed
```

The app runs at [http://localhost:3001](http://localhost:3001).

## 🧪 Testing

**1. Start Postgres** (same as above, if not already running).
```bash
docker run -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres
```

**2. Create the test database:**
```bash
docker run -it --rm postgres psql "postgres://postgres:yourpassword@host.docker.internal:5432/postgres" -c "CREATE DATABASE test_db;"
```

**3. Start the app in test mode, in its own terminal (applies migrations to `test_db`):**
```bash
npm run start:test
```

**4. Run the test suite, in a separate terminal:**
```bash
npm test
```

## 🔗 Links

- Repository for Full Stack Open Part 13 Relational Databases answers: https://github.com/Dax-Goonies/fullstackopen-part13
- Commands: https://github.com/Dax-Goonies/fullstackopen-part13/blob/main/command.sql
- Tests source code: https://github.com/fullstack-hy2020/tests