# Use a reliable OpenJDK base image
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory
WORKDIR /app

# Copy the built JAR file into the container
COPY target/to-do-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Render will replace it dynamically)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
