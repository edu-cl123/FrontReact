# Levanta la arquitectura
file_selected := -f docker-compose.$(env).yml
environment := $(env)

install: build tag_image push_dockerhub

up:
	@docker build -t frontend .


