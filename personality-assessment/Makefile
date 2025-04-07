# Variables
DOCKER_COMPOSE = docker-compose
SERVICE_NAME = frontend

.PHONY: up down build rebuild clean clean-all logs shell

# Start containers
up:
	$(DOCKER_COMPOSE) up -d

# Stop containers
down:
	$(DOCKER_COMPOSE) down

# Build containers
build:
	$(DOCKER_COMPOSE) build

# Rebuild containers (force clean build)
rebuild:
	$(DOCKER_COMPOSE) build --no-cache

# Stop containers, remove containers, networks, and volumes
clean:
	$(DOCKER_COMPOSE) down -v

# Full cleanup (including Docker system prune)
clean-all:
	$(DOCKER_COMPOSE) down -v --rmi all
	docker system prune -a -f

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE_NAME)

# Access container shell
shell:
	$(DOCKER_COMPOSE) exec $(SERVICE_NAME) sh

# Full reset: clean → rebuild → start
reset: clean rebuild up
