FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar config-file-server.jar
EXPOSE 9101
ENTRYPOINT ["java","-jar","/config-file-server.jar"]