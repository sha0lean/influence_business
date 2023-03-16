# Influence B

Initialisation du projet
> Au sein de ce fichier, vous aurez les configurations afin de lancer le projet en local. 
> Le projet se compose de 2 serveurs.

---

## Serveur Front
Rendez-vous dans le répertoire `/front`. 

Installez les dépendences et modules avec `npm install`.

Puis `npm start` afin de lancer le serveur, qui tournera sur le port `3000`.

Accedez à l'app à l'url : http://localhost:3000.

---
## API Back

Rendez-vous dans le répertoire `/back`. 

Installez les dépendences et modules avec `npm install`.

Rendez-vous dans le répertoire `/back/src`.

Ouvrez le fichier `.env` 

Changez vos identifiants `DB_USER` et `DB_PASS`

Créez également votre table "`ib`" dans votre logiciel de gestion de base de donnée favoris.

Lancez l'API avec `node app.js` toujours depuis `/back/src`.


---
## Dépannage
Pour créer manuellement le compte "`admin admin`"

Exécutez cette commande dans votre logiciel MySQL
```sql
ALTER TABLE users MODIFY COLUMN `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users MODIFY COLUMN `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
INSERT INTO Users (email, password, first_name, last_name, work_status, token)
VALUES ('admin', 'admin', 'Admin', '', false, 'token');

INSERT INTO Roles (id_user, role_name)
VALUES ((SELECT id_user FROM Users WHERE email = 'admin'), 'admin');

INSERT INTO Admins (id_role)
VALUES ( (SELECT   id_role FROM Roles WHERE id_user = (SELECT id_user FROM Users WHERE email = 'admin')));
```



