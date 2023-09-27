1. git clone this repository
2. cd into the project folder
3. docker-compose up -d
4. Wait a few minutes for the container to build successfully, check the logs from: docker logs nordic-easy-symfony-app-1 & docker logs nordic-easy-react-app-1
5. When the container built successfully and composer installed, run "docker exec -it nordic-easy-symfony-app-1 sh /var/www/html/setup.sh"
6. Open localhost:3000 in the browser to view client list.
   
