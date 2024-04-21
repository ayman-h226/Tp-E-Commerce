FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar microservice-produits.jar
ENTRYPOINT ["java","-jar","/microservice-produits.jar"]