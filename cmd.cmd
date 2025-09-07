@REM docker exec -i productsdb pg_dump productsdb > dump.sql -U postgres
docker-compose down
docker image pull zitrax78/product-service
docker image pull zitrax78/volha-gateway

@REM docker volume remove volha_postgres-data
@REM docker volume create volha_postgres-data

@REM docker run --name temp_postgres_restore -v "volha_postgres-data:/var/lib/postgresql/data" -e POSTGRES_USER=postgres -e POSTGRES_DB=productsdb -e POSTGRES_PASSWORD=zzz_pRR0w0RRq_vvv -d postgres
@REM docker exec -i temp_postgres_restore psql productsdb<dump.sql -U postgres
@REM docker stop temp_postgres_restore 
@REM docker rm temp_postgres_restore 
@REM timeout /t 15 /nobreak >nul
docker-compose up -d
docker exec -i productsdb psql productsdb<dump.sql -U postgres
@REM docker-compose up -d