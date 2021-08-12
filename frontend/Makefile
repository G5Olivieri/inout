.PHONY: up logs down shel docker_build_image build

up:
	docker-compose up -d

logs:
	docker-compose logs -f

down:
	docker-compose kill
	docker-compose rm -f

shell:
	docker-compose run --rm app sh

build:
	docker-compose run --rm app sh -c "yarn build"

docker_build_image:
	docker build -t "inout-frontend" .
