# TP Edge Services - Ecommerce  - FISA 4 INFO - INSA Hdf
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/mayel15/projet-intergiciel) [![forthebadge](https://forthebadge.com/images/badges/made-with-java.png)](https://github.com/mayel15/projet-intergiciel)

| ![Alaaeddin ALMAJJO](https://avatars.githubusercontent.com/u/77294802?v=4)  | ![Ayman DOULKOM](https://avatars.githubusercontent.com/u/116734751?v=4)          | ![Pape THIAM](https://avatars.githubusercontent.com/u/97792012?v=4) |
| :--------------: | :--------------: | :--------------: |
| Alaaeddin ALMAJJO | Ayman DOULKOM        | Pape THIAM  |
| 22001993  | 22008795           | 22009010  |
| [@aladinMJ](https://github.com/aladinMJ) | [@ayman-h226](https://github.com/ayman-h226)        | [@mayel15](https://github.com/mayel15)  |
| alaaeddin.almajjo@uphf.fr  | aymanbenewende.doulkom@uphf.fr           | papemayeldiagne.thiam@uphf.fr  |

# Configuration et lancement des microservices

- Cloner le projet 
```sh
git clone https://github.com/ayman-h226/Tp-E-Commerce.git
```

- Lancer la base de données dockerisé 
```sh
docker-compose up -d
```

- Lancer le microservice `config-file-server`
```sh
docker build -t config-file-server-img .
```

- Lancer le microservice `eureka-server`
```sh
docker build -t eureka-server-img .
```

- Lancer le microservice `microservide-produits`
```sh
docker build -t eureka-produits-img .
```

- Lancer le microservice `microservide-commandes`
```sh
docker build -t microservice-commandes-img .
```

- Lancer le microservice `microservide-paiements`
```sh
docker build -t microservice-paiements-img .
```

- Lancer le microservice `zuul-server`
```sh
docker build -t zuul-server-img .
```



