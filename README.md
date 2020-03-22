# dashboard

Shipyard Microservice

---

## Environment variables

| Name                  | Type     | Default   | Description                       |
| --------------------- | -------- | --------- | --------------------------------- |
| **SERVICE_NAME:**     | `String` | dashboard | Microservice name                 |
| **SERVICE_PORT:**     | `Number` | 3004      | Microservice port                 |
| **DATABASE_URL:**     | `String` |           | Database url                      |
| **NEWRELIC_LICENSE:** | `String` |           | NewRelic license token            |

## API

| Type | URL             | Body                                        | Query               | Response              | Description                                             |
| ---- | --------------- | ------------------------------------------- | ------------------- | --------------------- | ------------------------------------------------------- |
| GET  | `/api/status`   |                                             |                     | **online**: `boolean` | Testing service connection.                             |

## Usage

**LOCAL**: create a `.env` file, with the specified variables and run `docker-compose up -d --build`.

## License

This project is released under the [Apache version 2](LICENSE) license.
