FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar microservice-commandes.jar
ENTRYPOINT ["java","-jar","/microservice-commandes.jar"]