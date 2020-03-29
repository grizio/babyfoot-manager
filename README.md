# Babyfoot manager

## Requirements

* Node v13.12.0+ (tips: use https://github.com/nvm-sh/nvm)
* Docker
* No running postgresql running (otherwise, change port of `docker-compose.yml` and `config.js`)

## Getting started

```
docker-compose up -d
npm install
node index.js
```

The application will start on http://localhost:3000 (the console will also tell you explicitly).

## Stop

```
^C
docker-compose down
docker-compose clean
```

## Main architecture

The application is designed using Event-Sourcing.
In database are store all and only events of the application.

When starting the server, all events will be replayed.
In the context, it is quick enough.
In a real context, we could:

* Accept the waiting
* Cache state in database

Also, a hypothesis is the data will not be important enough to fill the memory.

On the front side, we also use generated events with server-sent events.
So the whole state will be replayed at startup.
It could lead in performance issue in real-life and could also be improved with state-caching.

## File structure

```
.
├── README.md            # This file
├── dev                  # dev files (sql initialization)
├── docker-compose.yml   # Infrastructure dependencies (for development usage)
├── package.json         # Package description
├── index.js             # Server startup
├── config.js            # Configuration of the application (server)
├── domain               # All the domain code (non-technical) of the application (server)
├── persistence          # SQL persistence (server)
├── router               # Express routing (server)
├── utils                # Miscellaneous utilities
├── views                # Contain the main HTML file
└── public               # Static file for the front
    ├── scripts          # Javascript files
    └── styles           # CSS files

```