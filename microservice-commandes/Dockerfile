FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar microservice-commandes.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/microservice-commandes.jar"]