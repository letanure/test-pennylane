# jean_test_front

Ce repo contient l'énoncé du test technique front-end, ainsi que le squelette de repository pour s'y attaquer.

## Énoncé

> ***Implémenter le front-end d'un éditeur de factures en React***


## Objectifs

L'objectif est d'utiliser l'API fournie pour construire un prototype d'éditeur de facture.

Celui-ci devra contenir des vues pour lister, créer, éditer, supprimer et finaliser des factures.

On attend du candidat qu’il porte attention à l’UX proposée à l’utilisateur ainsi qu’à la qualité du code fournie. Notre attention ne portera pas sur la qualité UI de la solution.

On attend également du candidat qu'il identifie 2 cas d'utilisation avancés dont peut avoir besoin l'utilisateur d'un éditeur de facture, et en implémente une solution. Pour chacun de ces cas, il faudra livrer :
- le cas d'utilisation en question,
- la solution proposée dans le prototype (même si un peu "workaround" comme le back-end est figé),
- éventuellement d'autres options d'implémentations pour aller plus loin / être plus robuste.


## Livrable

- Le code source sur un repository Github (inviter @quentindemetz et @tdeo), à défaut dans un fichier zip
- Une URL pour utiliser l'application (sur un serveur perso, Heroku ou autre)

Il faudra impérativement :
- Utiliser bootstrap (sans jquery) pour le style,
- Pour les composants JS de bootstrap (indisponibles en l'absence de jquery), utiliser l'équivalent dans [react-bootstrap](https://react-bootstrap.github.io/).

Finalement, on n'introduira pas de librairie de state management (i.e. Redux).


## Data-model

L'application devra interagir avec 4 modèles:
- `customers`: La liste des clients,
- `products`: La liste des produits disponibles,
- `invoices`: La liste des factures existantes,
  - particularité de celle-ci, une fois que le champ `finalized` est `true`, aucune valeur ne pourra être modifiée à l'exception du champ `paid`.
- `invoice_lines`: Les lignes constituant une facture.


## API

L'api est utilisable à l'URL suivante : https://jean-test-api.herokuapp.com/. Pour l'utiliser, il faudra envoyer en header le jeton fourni dans le header `X-TOKEN` (si besoin pour le jeton, contacter thierry@pennylane.tech).

Une API écrite en Rails est mise à disposition pour le test, on pourra consulter son code ici : https://github.com/pennylane-hq/jean_test_api

On trouvera dans le repository :
- dans [customers_controller_spec.rb](https://github.com/pennylane-hq/jean_test_api/tree/main/spec/requests/customers_controller_spec.rb) des exemples pour la recherche de client,
- dans [products_controller_spec.rb](https://github.com/pennylane-hq/jean_test_api/tree/main/spec/requests/products_controller_spec.rb) des exemples pour la recherche de produits,
- dans [invoices_controller_spec.rb](https://github.com/pennylane-hq/jean_test_api/tree/main/spec/requests/invoices_controller_spec.rb) des exemples pour les endpoint liés aux factures et à leurs lignes,
- dans le dossier [app/models/](https://github.com/pennylane-hq/jean_test_api/tree/main/app/models/) les différents modèles,
- dans le fichier [schema.rb](https://github.com/pennylane-hq/jean_test_api/blob/main/db/schema.rb) la structure des différentes tables,
- dans le dossier [app/views/](https://github.com/pennylane-hq/jean_test_api/tree/main/app/views/), les définitions des vues pour les différents endpoints au format [jbuilder](https://github.com/rails/jbuilder).

On pourra trouver plus d'information sur le langage Ruby On Rails dans les [guides Ruby on Rails](https://guides.rubyonrails.org/v6.0/)

Particularité :
- les lignes de factures sont manipulées via leur facture, pour les mettre à jour, on enverra sur l'endpoint `PUT /invoices/:invoice_id` la clé `invoice_lines_attributes`, qui contient une liste d'objets. (on regardera en particulier les tests de `InvoicesController`)


## Contenu du repo

Ce repo a été initialisé via [create-react-app](https://github.com/facebook/create-react-app).

Un certain nombre de paquets ont été ajoutés à ce repo (voir package.json), leur utilisation n'est pas obligatoire, mais un certain nombres peuvent être utiles sur certains sujets. Par exemple :
- Pour tout ce qui touche aux tableaux : [react-table](https://react-table.tanstack.com/),
- Pour les icones : [FontAwesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react),
- Pour les forms, [Formik](https://formik.org/docs/overview) et [yup](https://github.com/jquense/yup/).

On essaiera le plus possible de travailler avec les paquets présents dans le repo (il n'est pas strictement interdit d'en rajouter pour un autre besoin).
