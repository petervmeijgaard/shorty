# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
	@echo ""
	@echo " ██╗   ██╗██████╗ ██╗         ███████╗██╗  ██╗ ██████╗ ██████╗ ████████╗███████╗███╗   ██╗███████╗██████╗  "
	@echo " ██║   ██║██╔══██╗██║         ██╔════╝██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗ "
	@echo " ██║   ██║██████╔╝██║         ███████╗███████║██║   ██║██████╔╝   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝ "
	@echo " ██║   ██║██╔══██╗██║         ╚════██║██╔══██║██║   ██║██╔══██╗   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗ "
	@echo " ╚██████╔╝██║  ██║███████╗    ███████║██║  ██║╚██████╔╝██║  ██║   ██║   ███████╗██║ ╚████║███████╗██║  ██║ "
	@echo "  ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ "

# ===========================
# Main commands
# ===========================

init: \
	intro \
	do-destroy-project \
	do-build-containers \
	do-run-project \
	do-setup-hosts-file \
	do-install-dependencies

update: intro do-stop-containers do-run-project do-install-dependencies
install-dependencies: intro do-install-dependencies

# Docker containers
build: intro do-build-containers do-run-project
start: intro do-run-project
stop: intro do-stop-containers
down: intro do-destroy-project
restart: intro do-stop-containers do-run-project

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make commands ===\n"
	@echo "Project:"
	@echo "    make init                 Initialise and run the project for development."
	@echo "    make update               Update the codebase and restart the Docker environment."
	@echo "    make install-dependencies Install the dependencies for the application."
	@echo "    make migrate-database     Migrate a fresh database copy with fake data."
	@echo "\nDocker containers:"
	@echo "    make build                Build and start the project containers."
	@echo "    make start                Start the project containers."
	@echo "    make stop                 Stop the project containers."
	@echo "    make down                 Stop the project containers and clean the docker compose environment."
	@echo "    make restart              Restart the project containers."

do-show-container-info:
	@echo "\n=== Local dev environment is running ===\n"
	@echo "http://www.url-shortener.local     URL shortener app."

# Project recipes
do-install-dependencies:
	@echo "\n=== Installing dependencies for URL shortener ===\n"
	docker compose exec app pnpm install

# Docker container recipes
do-run-project: do-start-containers do-start-proxy do-connect-proxy
do-destroy-project: do-disconnect-proxy do-bring-containers-down

do-start-containers:
	@echo "\n=== Starting project containers ===\n"
	docker compose up -d

do-stop-containers:
	@echo "\n=== Stopping project containers ===\n"
	docker compose stop

do-bring-containers-down:
	@echo "\n=== Stopping project containers and cleaning docker compose environment ===\n"
	docker compose down -v --remove-orphans

do-build-containers:
	@echo "\n=== Building project containers ===\n"
	USERID=$$(id -u) GROUPID=$$(id -g) docker compose build

# Hosts proxy recipes

do-start-proxy:
	@echo "\n=== Starting hosts proxy ===\n"
	./dev/start-local-dev-proxy.sh

do-connect-proxy:
	@echo "\n=== Connecting to hosts proxy ===\n"
	@docker network connect url-shortener local-dev-proxy || true
	@echo "Connected the local-dev-proxy to the composer network."

do-stop-proxy:
	@echo "\n=== Stopping hosts proxy ===\n"
	@docker container stop local-dev-proxy || true
	@echo "Disconnected the local-dev-proxy to the composer network."

do-disconnect-proxy:
	@echo "\n=== Disconnecting from hosts proxy ===\n"
	@docker network disconnect url-shortener local-dev-proxy || true
	@echo "Disconnected the local-dev-proxy to the composer network."

do-setup-hosts-file:
	@echo "\n=== Adding local URL shortener hosts ===\n"
	@(cat /etc/hosts | grep -q url-shortener.local \
		&& echo 'No changes: url-shortener.local already available in the hosts file.') \
	|| (docker run --rm \
		-v /etc/hosts:/etc/hosts \
		-v $$(pwd)/dev/hostnames.txt:/dev/hostnames.txt \
		alpine:latest \
		sh -c 'cat /dev/hostnames.txt >> /etc/hosts' \
		echo "Hosts successfully added")
