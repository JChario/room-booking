
# Room Booking Project

## Project Overview
The Room Booking Project is a simple application designed to manage and book meeting rooms. The project consists of a Spring Boot backend and a React frontend, allowing users to view available rooms and create bookings through an easy-to-use interface.

## Project Specifications
- **JDK Version**: 17
- **Maven Version**: 3.9.6
- **Node.js Version**: v20.11.0 [NOTE: Node.js will be installed automatically but the path must be added to your system's environment variables.]
- **NPM Version**: 10.2.4

### Technologies Used:
- **Java 17** with **Spring Boot** (Backend)
- **React.js** (Frontend)
- **Maven** (Build tool)
- **H2 In-Memory Database** (Database for development and testing)

## Setup Instructions

### 1. Install Dependencies
Ensure that you have the required software installed on your machine.

#### JDK 17
Download and install JDK 17 from either:
- [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK](https://jdk.java.net/)

Ensure that `JAVA_HOME` is set to the JDK installation path and added to the system environment variables.

#### Maven 3.9.6
Download and install Maven from the [Maven website](https://maven.apache.org/download.cgi). Ensure that the `Maven` path is added to the system's environment variables.

### 1. Build the Project
Navigate to the root directory of the project and build it using Maven:
```bash
mvn clean install
```
This command will download all dependencies, compile the source code, and run unit tests.

### 2. Start the Spring Boot Application
To start the backend Spring Boot application, run the following command in the project root:
```bash
mvn spring-boot:run
```
This will start the server on `http://localhost:8080`.

### 3. Start the Frontend Application
Navigate to the frontend directory and start the React application:
```bash
cd room-booking-ui
npm start
```
This command will start the React development server, typically accessible at `http://localhost:3000`.

## Testing the Application
After starting both the backend and frontend applications, you can begin testing the application using the following endpoints:

### URLs for Testing:
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
    - Use Swagger UI to test the API endpoints and verify the backend services.

- **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
    - Default H2 database URL: `jdbc:h2:mem:roombooking`
    - Username and password can be found (or configured) in the `application.properties` file.

## Additional Notes
- **Environment Variables**: Make sure that both `JAVA_HOME` and the Node.js installation path are added to your system's `Path` variable to ensure proper execution of Java, Maven, and Node commands.
- **Ports**: The backend service will run on port `8080` and the frontend on port `3000` by default. Ensure that these ports are free before starting the services.

## Troubleshooting
- **Node/NPM Not Recognized**: If you see an error indicating `'npm' is not recognized as a command`, ensure that Node.js is installed and the installation path is added to your system's environment variables.
- **Compilation Issues**: Ensure that you are using JDK 17 and Maven 3.9.6, as other versions might cause compilation or compatibility issues.
- **Swagger/H2 Issues**: Make sure the backend service is running before trying to access Swagger UI or the H2 console.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributors
- [John Charitos](mailto:johnsou3004@gmail.com)

Feel free to contribute by submitting pull requests or raising issues for improvements.

---

Now you're ready to start working with the Room Booking project! If you encounter any issues, please refer to the troubleshooting section or contact the contributors for help.
