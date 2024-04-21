FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar config-file-server.jar
ENTRYPOINT ["java","-jar","/config-file-server.jar"]