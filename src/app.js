const express = require('express');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3000;

const redis_address = process.env.REDIS_ADDRESS || "127.0.0.1";
const redis_port = process.env.REDIS_PORT || 6379;
const redis_password = process.env.REDIS_PASSWORD || "redis";

let redisClient;

(async () => {
  console.log('[INFO] Connecting to Redis server at: ' + redis_address + ':' + redis_port)

  redisClient = redis.createClient({
    socket: {
      host: redis_address,
      port: redis_port
    },
    password: redis_password
  });

  redisClient.on('error', error => {
    console.error('Error: ' + error);
  });

  await redisClient.connect();
  console.log('[INFO] Successfully connected to Redis.')

  await redisClient.set('foo', 'bar');
  console.log('[INFO] Successfully set arbitrary data to Redis.')
})();

async function getRedisData(req, res) {
  res.send({key: await redisClient.get(req.params.key)});
}

app.get('/:key', getRedisData);

app.listen(port, function() {
  console.log('[INFO] App listening on port ' + port);
});