FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar zuul-server.jar
EXPOSE 9004
ENTRYPOINT ["java","-jar","/zuul-server.jar"]