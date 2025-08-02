# Project Variables
PROJECT_NAME := task-manager
DOCKER_IMAGE := $(PROJECT_NAME):latest
DOCKER_COMPOSE := docker-compose.yml

# Build Docker image
down: 
	docker-compose down
up:
	docker-compose up --build -d 

build:
	docker build -t nest-task-manager .

mongo-run: create-network
	docker run -d --name mongo --network app-net -p 27017:27017 mongo

run: mongo-run
	docker run -d --name nestapp --network app-net -p 3000:3000 nest-task-manager

logs:
	docker logs nestapp

stop-mongo:
	docker stop mongo

clean-container:
	docker stop mongo || true
	docker rm mongo || true
	docker stop nestapp || true
	docker rm nestapp || true
	docker stop nginx || true
	docker rm nginx || true
	docker network rm app-net || true


create-network: clean-container 
	docker network create app-net

nginx:
	docker run -d \
	  --name nginx \
	  --network app-net \
	  -p 80:80 \
	  -v $(shell pwd)/default.conf:/etc/nginx/conf.d/default.conf \
	  nginx
	  






.PHONY: up build run nginx down logs stop-mongo clean-container create-network mongo-run
# End of Makefile
# This Makefile provides commands to manage the Docker containers for the task management application

