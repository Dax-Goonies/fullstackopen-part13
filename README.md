docker run -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres


## 1. start docker
docker run -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres

## 2. open postgres terminal
docker run -it --rm postgres psql "postgres://postgres:yourpassword@host.docker.internal:5432/postgres"

## 3. start app
npm run dev

## 4. populate db
npm run seed