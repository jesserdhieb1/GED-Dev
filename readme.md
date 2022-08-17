# Setup
***Remplir ces variables d'environnment dans le fichier***  ```.env``` 

***variables***  | ***contenu***
------------- | -------------
***MONGO_URI***  | le lien de connection avec le cloud de mongo db qui stocke nos données sur l'url  http://cloud.mongodb.com 
***PORT***  | le numero de port ou le serveur est connecté
***JWT_SECRET***  | le mo sect qui encode le token JWT
***JWT_LIFETIME***  | la durée avant que le token JWT expire

***puis*** 

```bash
npm install && npm start
```

# Diagramme de classes 
![diagramme de classe](https://user-images.githubusercontent.com/73405867/185037237-51754eb7-2316-48b5-a853-1e5fdab973ab.png)

# Fonctionnalitées 

### Authentification

- register (by all)

- login (by all)

### User

- find all users (by only admin)

- update users (by only admin)

- delete users (by only admin)

- accept user (by only admin) => with changing the role

- block user (by only admin) => with changing the role

### Assurance

- find all Assurance(by only admin,personnel)

- update Assurance(by only admin,personnel)

- delete Assurance(by only admin,personnel)

### Bureau

- find all bureau(by only admin,personnel)

- update bureau(by only admin)

- delete bureau(by only admin)

### Contrat

- find all contrat(by only admin,personnel)

- find all contrat by assurance(by admin,personnel,assurance)

- find all contrat by Bureau(by admin,personnel)

- find all contrat by User(by admin,personnel)

- update contrat(by only admin,personnel)

- delete contrat(by only admin,personnel)



