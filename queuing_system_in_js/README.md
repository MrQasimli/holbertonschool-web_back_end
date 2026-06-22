# Queuing System in JS

## Description

A queuing system built with Node.js, Redis, Kue, and Express. This project covers Redis basics, async operations with Node.js, and building an Express API backed by Redis and a job queue.

## Requirements

- Ubuntu 18.04
- Node 12.x
- Redis 5.0.7

## Setup

### Install dependencies

```bash
npm install
```

### Install and run Redis

```bash
wget http://download.redis.io/releases/redis-6.0.10.tar.gz
tar xzf redis-6.0.10.tar.gz
cd redis-6.0.10
make
src/redis-server &
```

### Verify Redis is running

```bash
src/redis-cli ping
# Expected: PONG
```

### Set test key

```bash
src/redis-cli set Holberton School
src/redis-cli get Holberton
# Expected: "School"
```

### Stop Redis server

```bash
kill $(ps aux | grep redis-server | grep -v grep | awk '{print $2}')
```

## Tasks

### 0. Install a redis instance

Sets up Redis, stores `Holberton=School`, and copies the resulting `dump.rdb` into the project root.

### 1. Node Redis Client

Connects to Redis using the `redis` npm package.

```bash
npm run dev 0-redis_client.js
```

### 2. Node Redis client and basic operations

Basic get/set operations with callbacks.

```bash
npm run dev 1-redis_op.js
```

### 3. Node Redis client and async operations

Uses `promisify` to handle Redis operations with async/await.

```bash
npm run dev 2-redis_op_async.js
```

### 4. Node Redis client and advanced operations

Stores hash values in Redis using `hset`/`hgetall`.

```bash
npm run dev 4-redis_advanced_op.js
```

### 5. Node Redis client publisher and subscriber

Implements a pub/sub pattern with two separate processes.

```bash
npm run dev 5-subscriber.js
npm run dev 5-publisher.js
```

## Resources

- [Redis quick start](https://redis.io/topics/quickstart)
- [Redis client for Node JS](https://github.com/NodeRedis/node-redis)
- [Kue](https://github.com/Automattic/kue)
