# MongoDB sample data (librarydb)

This project uses MongoDB database: `librarydb`.

## Collections

- `books`: all books shown on Home/Genre/Search
- `users`: users + admins (note: backend auto-creates `admin1`)

## Option A: Seed using `mongosh` (recommended)

1. Start MongoDB locally.
2. Run:

```bash
mongosh "mongodb://localhost:27017/librarydb" "./seed/seed-books.mongosh.js"
```

This will insert sample books into `books` (it is safe to run multiple times; it uses stable `_id`s).

## Option B: Seed using `mongoimport` (JSON file)

```bash
mongoimport \
  --uri="mongodb://localhost:27017/librarydb" \
  --collection=books \
  --jsonArray \
  --file="./seed/books.json"
```

## Primary admin (`admin1`)

On backend startup, if no user exists with email `admin1@library.com`, it will be created automatically:

- email: `admin1@library.com`
- password: `Admin1Password!`
- role: `ADMIN`

## Notes about seeding users

Passwords are stored as BCrypt hashes (field `passwordHash`). The intended flow is:

- Create users by registering from the UI (recommended), or
- Insert users manually with a valid BCrypt hash.