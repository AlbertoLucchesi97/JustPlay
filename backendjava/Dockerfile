FROM openjdk
WORKDIR /backendjava
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY . .
CMD [ "./mvnw", "spring-boot:run" ]