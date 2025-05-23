# Passgen

Small password generator project. Contains a public API built with Express running on NodeJS as the backend, and a frontend component built using Svelte.

### Installation

This project was built using `pnpm` as the intended package manager, but should work just as well with any other similar tools.

`Node v20.x` or higher is recommended.

## Backend

The API is currently publicly hosted and free to use.

```curl
curl --request POST \
  --url https://passgen.camescasse.dev/api/generator \
  --header 'content-type: application/json' \
  --data '{
  "length": 12,
  "lowercase": true,
  "uppercase": true,
  "numbers": true,
  "symbols": true
}'
```

### Run Locally

Clone the project

```bash
  git clone https://github.com/camescasse/passgen.git
```

Go to the project directory

```bash
  cd passgen/backend
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```

### Running Tests

To run tests, run the following command

```bash
  pnpm test
```

### Deployment

To deploy this project run

```bash
  pnpm build
  pnpm start
```
