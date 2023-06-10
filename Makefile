# Levanta la arquitectura
file_selected := -f docker-compose.$(env).yml
environment := $(env)

install: build tag_image push_dockerhub

up:
	@docker build -t frontend .

tag_image:
	@docker tag frontend juanfr21/iestablero:latest

push_dockerhub:
	@docker push juanfa21/iestablero:latest
