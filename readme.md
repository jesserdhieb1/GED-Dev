# Setup
- ***Remplir ces variables d'environnment dans le fichier***  ```.env``` 

***variables***  | ***contenu***
------------- | -------------
***MONGO_URI***  | le lien de connection avec le cloud de mongo db qui stocke nos données sur l'url  http://cloud.mongodb.com 
***PORT***  | le numero de port ou le serveur est connecté
***JWT_SECRET***  | le mo sect qui encode le token JWT
***JWT_LIFETIME***  | la durée avant que le token JWT expire

***puis*** 

- ***créer une répertoire sous le nom***  ```uploads``` 

***finallement*** 

```bash
npm install && npm start
```

# Diagramme de classes 
![diagramme de classe](https://user-images.githubusercontent.com/73405867/185502797-39e218dd-4a46-42f4-be98-0eb6fe8d2d84.png)

# Fonctionnalitées 

### Authentification

- register (by all)

- login (by all)

### User

- findOne user(by only admin)

- find all users (by only admin)

- update users (by only admin)

- delete users (by only admin)

- reset user password (by all)

- reset role user (by only admin)

### Bureau

- findOne bureau(by only admin,personnel)

- create bureau (by only admin,personnel)

- find all bureau(by only admin,personnel)

- update bureau(by only admin)

- delete bureau(by only admin)

### Contrat

- findOne Contrat(by only admin,personnel)

- findOne Contrat with assurance(by only admin,personnel,assurance)

- find all contrat(by only admin,personnel)

- find all contrat by assurance(by admin,personnel,assurance)

- create contrat(by only admin,personnel)

- download contrat(by only admin,personnel)

- update contrat(by only admin,personnel)

- delete contrat(by only admin,personnel)



