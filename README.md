# Influenceur business

> **title:** Initialisation du projet influenceur business
> Bienvenue chez influenceur business ! Au sein de ce fichier, vous aurez les configurations afin de lancer le projet
> -> Le projet se compose de 2 serveurs (un pour le frontend, un pour le backend)

## Le serveur front

Afin de pouvoir lancer le serveur front, rendez-vous dans le répertoire "front". Ensuite, installez les dépendences à l'aide de la commande "npm install". Puis, lorsque tous les modules ont été correctement installés, lancez la commande "npm start" afin de lancer le serveur, qui tournera sur le port 3000.
Ensuite, tapez l'url "http://localhost:3000" afin d'accéder à la page d'accueil du site.a

## Le serveur backend (l'api)

Afin de pouvoir lancer le serveur back, rendez-vous dans le répertoire "back". Ensuite, installez les dépendences à l'aide de la commande "npm install". Puis, lorsque tous les modules ont été correctement installés, passez dans le répertoire "src" et ouvrez le fichier .env où vous devez mettre vos identifiants de base de données mysql (changez DB_USER et DB_PASS). Egalement, créer la base de données "influenceurBusiness" dans votre logiciel mysql. Puis, lancez la commande "node app.js" dans le répertoire src.
