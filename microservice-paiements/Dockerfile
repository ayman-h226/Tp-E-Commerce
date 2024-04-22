FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar microservice-paiements.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/microservice-paiements.jar"]