# Groupomania
Projet 7 D'Openclassrooms

1er étape : Chose requises avant commencement

Créer un compte MongoDB (https://www.mongodb.com/)
Installer NodeJS sur l’ordinateur (https://nodejs.org/en/)
Installer Git sur l’ordinateur (https://git-scm.com/downloads)


2ème étape : Explications de l’installation du site

- Créer compte MangoDB :
Dans un premier temps nous allons nous rendre sur MangoDB.

Commencez à vous créer un compte. 

Une fois sur la page des abonnements cliquez sur l’option « Free » (3ème option). 
Ensuite sur la page « Create a Shared Cluster », sélectionner :
![image](https://user-images.githubusercontent.com/97230074/205503246-5b87888c-5041-4b9b-9322-78652a5c2fb5.png) --> ![image](https://user-images.githubusercontent.com/97230074/205503272-87d5a34f-3917-40a5-afc3-25fe31c2fb2f.png) --> ![image](https://user-images.githubusercontent.com/97230074/205503279-830b8c14-c09d-4939-a671-713535351865.png)(Sélectionner le pays le plus proche de votre lieu).
Cliqué sur Create Cluster.

- Créer un utilisateur MangoDB
Mettre un user name et un password et enregistrez le.
Sur la même page allez sur « Add entries to your IP Access List » et mettez comme IP Adress --> « 0.0.0.0/0 » et mettez comme Description --> « accés tout utilisateur ». Puis cliqué sur « Add Entry ». Et Pour terminer cliquez sur « Finish and Close » et ensuite sur « Go to Databases ».
Les paramétrages de base sont effectués.

- Paramétrage de la communication entre MongoDB et Groupomania
Nous voyons votre Cluster dans Database ![image](https://user-images.githubusercontent.com/97230074/205503341-0b8fad46-17b7-4583-8b28-c1c355a9a638.png)
Cliquez sur « Connect » et sur « MangoDB Drivers » ![image](https://user-images.githubusercontent.com/97230074/205503347-08efb31a-c5d3-4a09-9109-7e427dc7436e.png).
Retenons le code de connexion de la base de donnée. Exemple pour mon cas « mongodb+srv://Utilisateur:<password>@cluster0.ezeb2vy.mongodb.net/?retryWrites=true&w=majority ».  

- Installation de Groupomania
Télécharger la base de données qui est sur le GitHub, en cliquant sur « Code » et ensuite sur « Download ZIP ».
Créez sur votre bureau un nouveau dossier que vous renommerez « Groupomania ». 
Ouvrez le dossier et copier/coller le fichier ZIP, précédemment téléchargé.
Extraire les fichiers compressés dans le dossier même.
Ouvrez le dossier backend.
Créez un « Nouveau dossier », que vous renommerez « images ».
Ensuite créer un nouveau document texte que vous nommerez « .env ». 
Dans le .env copiez le code de connexion que nous avons retenue précédemment dans MangoDB. 
Ensuite dans le .env inscrivez « DB_MONGOOSE= » et ensuite collez code de connexion (/ ! \ changez le <password>, en mot de passe que vous avez mis pour l’utilisateur sur MangoDB). 
Exemple « DB_MONGOOSE=mongodb+srv://Utilisateur:votremotdepasse@cluster0.ezeb2vy.mongodb.net/?retryWrites=true&w=majority ».
Retourner sur votre dossier Backend, faire un clique-droit dans le dossier, et sélectionner « Git Bash Here ».
Sur Git Bash inscrivez « npm install », taper sur entrée. Ensuite marquez 
« nodemon server.js », taper sur entrée. 
/ ! \ Ne surtout pas fermer le Git Bash
Maintenant allez dans Frontend. 
Clique-droit dans le dossier, et sélectionner « Git Bash Here ».
Sur Git Bash inscrivez « npm install », cliquez sur entrée. Ensuite marquez 
« ng serve » , tapez sur entrée. 
/ ! \ Ne surtout pas fermer le Git Bash

- Accéder au site Groupomania
Allez sur internet. Et dans un nouvel onglet tapez «http://localhost:4200».
Nous voici sur le site Groupomania.

- Créer un administrateur :
Créez-vous un compte en cliquant sur « S’inscrire » sur le site Groupomania.
Ensuite allez sur MongoDB, et dans Database (en dessous de Deployment). Cliquez dans « Browse Collections » et sur « User », ainsi vous verrez vos utilisateur créés. 
Puis double cliquez sur « False », et changer « False » par « True », tout en finissant par cliquer sur « Update » en bas à droite.
Retournez sur Groupomania
L’utilisateur auquel vous avez mis « true » est maintenant adminstrateur.

- Relancer le site

Quand vous souhaiterez rouvrir le site faite un Git Bash dans Backend.
Ensuite faite un clique droit dans le dossier, marquez « nodemon server.js » et cliquez sur entrez. 
/ ! \ Ne surtout pas fermer le Git Bash
Maintenant allez dans Frontend. 
Clique-droit dans le dossier, et sélectionner « Git Bash Here ».
Sur Git Bash marquez « ng serve » et cliquez sur entrez. 
/ ! \ Ne surtout pas fermer le Git Bash
