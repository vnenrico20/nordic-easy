1. cd into the project folder
2. docker-compose up -d
3. Wait a few minutes for the container to build successfully, check the logs from: docker logs nordiceasy-symfony-app-1 & docker logs nordiceasy-react-app-1. 
4. When the container built successfully and composer installed, run "docker exec -it nordiceasy-symfony-app-1 sh /var/www/html/setup.sh"
5. Open localhost:3000 in the browser to view client list.
   
