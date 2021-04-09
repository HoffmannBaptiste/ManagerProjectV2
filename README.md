# ProjectManager
Outils de création, de validation et de gestion de projets


# Outils et logiciels requis pour l'application

# Logiciels requis #

- Docker
  * Version 19.03.8
  
- Docker Compose
  * Version 1.25.4

# Outils open source inclus et utilisés #

- Angular CLI
  * Version 8.3.17


- NPM / NodeJS
  * Version 12.13.0

- Mariadb
  * Version 10.1

- Docker
  * Version 19.03.8
  
- Docker Compose
  * Version 1.25.4
  
## Installation

**Avant de proceder :** veuillez bien installer les outils docker et docker-compose

## Verification des differents outils


### Obtenir les fichiers sources pour le fonctionnement de l'application

```bash
git clone https://github.com/AhmedALSGit/ProjectManager.git
```


### Verification du fonctionnement de Docker

```bash
docker version
```

### Verification du fonctionnement de Docker-compose

```bash
docker-compose version
```

## Utilisation de Docker-compose

Contenu du docker-compose :

```bash
version: '3.7' # specify docker-compose version

networks:
  # Server network to hold database and backend
  applinetwork: {}

# Define the services/containers to be run
services:
  
  database: # name of the third service
    build: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: 8CFmTxG4r5oSS7IYvT2N
      MYSQL_DATABASE: retest
    ports:
      - "3306:3306" # specify port forewarding
    networks:
      # Add the database service to the servernetwork.
      - applinetwork

  express-app: #name of the second service
    build: express-server # specify the directory of the Dockerfile
    restart: always
    ports:
      - "3000:3000" #specify ports forewarding
    networks:
      # Add the express service to the servernetwork.
      - applinetwork
    depends_on:
      - "database-app"
    command: bash -c "./wait-for-it.sh --timeout=0 database-app:3306 && npm start"

  angular: # name of the first service
    build: angular-app
    ports:
      - "4200:4200" # specify port forewarding
    networks:
      # Add the angular service to the servernetwork.
      - applinetwork
```

On doit pouvoir exécuter la commande docker-compose décrit ci-dessous :

```bash
docker-compose -f docker-compose.yml up -d --build
```

Une fois le script lancer, il devrait passer par 9 étapes au total (voir ci-dessous)

```bash
Creating network "projectmanager_applinetwork" with the default driver
Building database-app
Step 1/2 : FROM mariadb:10.1
 ---> 97b484de89b8
Step 2/2 : ADD ./database_file /docker-entrypoint-initdb.d
 ---> Using cache
 ---> 889bb63851e1

Successfully built 889bb63851e1
Successfully tagged projectmanager_database-app:latest
Building angular-app
Step 1/9 : FROM node:12.16.1 as build
 ---> d834cbcf2402
Step 2/9 : WORKDIR /app
 ---> Using cache
 ---> 7e75b3f1f02e
Step 3/9 : ENV PATH /app/node_modules/.bin:$PATH
 ---> Using cache
 ---> 6400c9d969b0
Step 4/9 : COPY package.json /app/package.json
 ---> Using cache
 ---> 89ec948dec2b
Step 5/9 : RUN npm install
 ---> Using cache
 ---> 78d80df41380
Step 6/9 : RUN npm install -g @angular/cli@8.3.17
 ---> Using cache
 ---> 0f72d934b259
Step 7/9 : COPY . /app
```

Attention : certains messages en rouge au niveau des installations NPM peuvent apparaitre\
Ce ne sont pas des erreurs, il faut attendre que le script continue dans ces cas précis. \

On obtient donc trois containeurs avec la commande ***docker-compose ps*** :

```bash
            Name                           Command               State           Ports         
-----------------------------------------------------------------------------------------------
projectmanager_angular-app_1    docker-entrypoint.sh npm start   Up      0.0.0.0:4200->4200/tcp
projectmanager_database-app_1   docker-entrypoint.sh mysqld      Up      0.0.0.0:3306->3306/tcp
projectmanager_express-app_1    docker-entrypoint.sh bash  ...   Up      0.0.0.0:3000->3000/tcp
```

On a également les logs des containeurs (si besoin d'avoir des détails sur leurs fonctiennements) \
On utilise la commande ***docker-compose logs*** :

```bash
database-app_1  | 2020-03-26 09:30:35+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 1:10.1.44+maria-1~bionic started.
database-app_1  | 2020-03-26 09:30:37+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
database-app_1  | 2020-03-26 09:30:37+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 1:10.1.44+maria-1~bionic started.
database-app_1  | 2020-03-26 09:30:37+00:00 [Note] [Entrypoint]: Initializing database files
database-app_1  | 2020-03-26  9:30:38 140260928817152 [Note] /usr/sbin/mysqld (mysqld 10.1.44-MariaDB-1~bionic) starting as process 85 ...
angular-app_1   | 
angular-app_1   | > projetperso@0.0.0 start /app
angular-app_1   | > ng serve --host 0.0.0.0
angular-app_1   | 
angular-app_1   | WARNING: This is a simple server for use in testing or debugging Angular applications
angular-app_1   | locally. It hasn't been reviewed for security issues.
angular-app_1   | 
angular-app_1   | Binding this server to an open connection can result in compromising your application or
angular-app_1   | computer. Using a different host than the one passed to the "--host" flag might result in
angular-app_1   | websocket connection issues. You might need to use "--disableHostCheck" if that's the
angular-app_1   | case.
angular-app_1   | ℹ ｢wds｣: Project is running at http://0.0.0.0:4200/webpack-dev-server/
angular-app_1   | ℹ ｢wds｣: webpack output is served from /
angular-app_1   | ℹ ｢wds｣: 404s will fallback to //index.html
angular-app_1   | 
angular-app_1   | chunk {main} main.js, main.js.map (main) 273 kB [initial] [rendered]
angular-app_1   | chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 269 kB [initial] [rendered]
angular-app_1   | chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
angular-app_1   | chunk {styles} styles.js, styles.js.map (styles) 9.68 kB [initial] [rendered]
angular-app_1   | chunk {vendor} vendor.js, vendor.js.map (vendor) 5.04 MB [initial] [rendered]
angular-app_1   | Date: 2020-03-26T09:31:04.664Z - Hash: c5417c8c3107bb016927 - Time: 20680ms
angular-app_1   | ** Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ **
angular-app_1   | ℹ ｢wdm｣: Compiled successfully.
express-app_1   | wait-for-it.sh: waiting for database-app:3306 without a timeout
express-app_1   | wait-for-it.sh: database-app:3306 is available after 31 seconds
express-app_1   | 
express-app_1   | > projetperso@0.0.0 start /app
express-app_1   | > node /app/servernd.js
express-app_1   | 
```

## Commandes Angular et NodeJS

### Les commandes utiles au niveau d'Angular :

Version d'Angular
```bash
ng version
```

Aide au niveau d'Angular
```bash
ng help
```

Lancer un projet en developpement :
```bash
ng serve --host 0.0.0.0 # Autorise tous les domaines
```

Génerer des composants (pages), services et autres :
```bash
ng generate --help
```

### Generation d'un projet

```bash
ng new NOM-DU-PROJET-ANGULAR
cd NOM-DU-PROJET-ANGULAR
```

### Les commandes utiles au niveau de NodeJS :

Version de NodeJS
```bash
node -v
```

Lancer le serveur node :
```bash
node fichier-serveur.js
```

Redemarrer le serveur node à chaque changement dans un fichier du serveur node : \
(En developpement)
```bash
nodemon fichier-serveur.js
```