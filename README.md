# ToursAndTravelProject

A full‑stack guided tours discovery and booking application (backend + frontend). This repository contains a Spring Boot backend (Java 21, Spring Boot 4.1.0) and a Vite + React frontend. The backend exposes REST endpoints to manage tours, locations, lodging, transport and bookings; it uses Spring Data JPA for persistence, Spring Security (JWT + OAuth2) for authentication, Cloudinary for image uploads and Stripe for payment processing.

## Technologies used

- Backend
  - Java 21
  - Spring Boot 4.1.0 (spring-boot-starter-webmvc)
  - Spring Data JPA (persistence)
  - Spring Security + OAuth2 client (authentication/authorization)
  - JJWT (io.jsonwebtoken) for JWT handling
  - MySQL (runtime) / H2 (tests)
  - Cloudinary (image uploads)
  - Stripe Java SDK (payments)
  - Lombok (optional)
  - springdoc-openapi (OpenAPI UI)

- Frontend
  - React 18 + Vite
  - React Router DOM
  - Redux Toolkit
  - Tailwind CSS
  - Axios for HTTP requests
  - jwt-decode for client JWT handling

- Tooling
  - Maven (mvnw wrapper)
  - Vite (frontend dev/build)
  - ESLint / PostCSS / Tailwind / PostCSS Autoprefixer

## Project structure (top-level)

src/
  main/
    java/com/tours/
      TeluskoToursProjectApplication.java    (Spring Boot entrypoint)
      Config/      configuration classes (security, cloudinary, etc.)
      Controller/  REST controllers (BookingController, TourController, UserController, LocationController, LodgingController, TransportController, PublicLocationController)
      Dto/         DTOs (e.g. LoginRequest.java)
      Entities/    JPA entities (Booking.java, Tour.java, Location.java, Lodging.java, Transport.java, Users.java)
      Repo/        Spring Data repositories (BookingRepo, TourRepo, UserRepo, ...)
      Service/     business logic and helpers (JwtService, CloudinaryImageService, ImageService, BookingService, etc.)
      Exception/   custom exceptions and handlers
      Logging/     app.log and logging helpers
    resources/     application properties / configs
    Frontend/      React + Vite frontend (package.json, src/...) 

pom.xml           Maven build and dependencies
mvnw / mvnw.cmd    Maven wrapper
README.md          (this file)

## How to run (backend)

1. Configure environment / application properties (examples):

- spring.datasource.url: jdbc:mysql://<host>:<port>/<db>
- spring.datasource.username
- spring.datasource.password
- JWT_SECRET (or property used by JwtService)
- CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
- STRIPE_API_KEY
- spring.security.oauth2.client.registration.<provider>.client-id
- spring.security.oauth2.client.registration.<provider>.client-secret
- spring.profiles.active (optional)

2. From the repository root, run the backend with the Maven wrapper:

./mvnw spring-boot:run

or build a jar and run:

./mvnw clean package
java -jar target/*.jar

## How to run (frontend)

1. Go to the frontend folder and install dependencies:

cd src/main/Frontend
npm install

2. Run dev server:

npm run dev

3. Build for production:

npm run build

If you serve the frontend separately in production, ensure the frontend is configured to call the backend API URL (check axios base URL in the frontend code).

## Important files to review

- src/main/java/com/tours/TeluskoToursProjectApplication.java (app entrypoint)
- pom.xml (all backend dependencies)
- src/main/java/com/tours/Service/JwtService.java (JWT handling)
- src/main/java/com/tours/Service/CloudinaryImageService.java (Cloudinary integration)
- src/main/java/com/tours/Service/CustomOAuth2UserService.java (OAuth2 flow)
- src/main/Frontend/package.json (frontend dependencies and scripts)

## Development notes

- Java 21 is declared in pom.xml. Ensure your JDK matches.
- The repo uses Cloudinary and Stripe — set credentials before testing features that upload images or create payments.
- There is an empty README at repo root prior to this change; this file adds a full description and quick-start instructions.

## Next steps / suggestions

- Add an example application.properties.example with expected env var names and sample values (DB, Cloudinary, Stripe, JWT).
- Add a CONTRIBUTING.md and simple run/debug instructions for contributions.
- Add CI that builds backend and frontend and runs basic checks.

## License

This repository includes a LICENSE file at the root. Follow its terms for reuse.

