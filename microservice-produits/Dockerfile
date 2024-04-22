FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar microservice-produits.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/microservice-produits.jar"]