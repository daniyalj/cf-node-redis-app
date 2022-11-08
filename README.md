# Sample Node.js Application with a Redis Backend

## Run Locally
Start a local Redis server.
```bash
redis-server --requirepass testing123 --port 6379
```

Install necessary libraries.
```bash
npm install express
npm install redis
```

Run it.
```bash
node src/app.js
```

In a second terminal, curl the endpoint.
```bash
curl http://127.0.0.1:3000/foo
```

> output
```json
{"key":"bar"}
```

## Run on CloudFoundry
```bash
cf push
```