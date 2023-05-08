FROM mysql:8-debian

RUN apt update && apt install -y curl && apt install -y gnupg2 && \
curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt install -y nodejs

ENV MYSQL_PORT=3306
ENV MYSQL_ROOT_PASSWORD=root 
ENV MYSQL_DATABASE=usuarios_bd
ENV MYSQL_USER=devsdi
ENV MYSQL_PASSWORD=qwerty

#expose ports 8081 para nodejs y 3306 para mysql
EXPOSE 8081 3306

COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]