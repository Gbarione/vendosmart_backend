<p align="center">
  <a href="https://vendorsmart.com/" target="blank"><img src="https://vendorsmart.com/vs/assets/media/svg/logos/vendor-smart.svg" width="360" alt="Vendor Smart Logo" /></a>
</p>

# Description

This project is a simple API that allows you to manage vendors and jobs. It is built with NestJS and uses a local storage for the data.

## Table of Contents

1. [Project Setup](#project-setup)
    - [With Docker](#project-setup-with-docker)
    - [Without Docker](#running-without-docker)
2. [API Endpoints](#api-endpoints)
3. [Authentication](#authentication)
4. [Project Structure](#project-structure)
5. [Postman Collection](#postman-collection)
6. [Running Tests](#running-the-tests)
7. [Automated Job Request Script](#automated-job-request-script)
8. [Potential Improvements](#potential-improvements)

## Project Setup

### Project Setup with Docker

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

3. Build and run the Docker container:

    ```bash
    docker-compose up --build
    ```

4. The application will be available at `http://localhost:8090`.

### Running without Docker

If you prefer to run the project without Docker, follow these steps:

1. Install dependencies:

    ```bash
    yarn install
    ```

2. Set up environment variables:
   Create a `.env` file in the root of the project and add the following:

    ```
    PORT=8090
    BASIC_AUTH_USERNAME=vs_tech_challenge
    BASIC_AUTH_PASSWORD=SuperSecurePassword123@
    ```

3. Run the project:

    ```bash
    # development
    $ yarn run start

    # watch mode
    $ yarn run start:dev

    # production mode
    $ yarn run start:prod
    ```

## API Endpoints

-   `POST /job`: Create a new job (requires authentication)
-   `POST /vendor`: Create a new vendor (requires authentication)
-   `GET /vendor/potential`: Get potential vendors for a job (requires authentication)
-   `GET /vendor/reachable`: Get reachable vendors based on location and category (does not require authentication)

## Authentication

The API uses Basic Authentication. Make sure to include the appropriate headers in your requests.

## Project Structure

-   `src/`: Source code
    -   `_core/`: Core functionality (guards, interceptors, pipes)
    -   `category/`: Category module
    -   `job/`: Job module
    -   `location/`: Location module
    -   `service/`: Service module
    -   `vendor/`: Vendor module
-   `test/`: Test files

## Postman Collection

You can find the Postman collection in the `vendorsmart.postman_collection.json` file.

## Running the tests

```bash
yarn test:cov
```

## Automated Job Request Script

The `automate-job-request.sh` script create jobs and vendors.

### Usage:

1. Ensure `curl` is installed
2. Run the script:
    - On Unix-like systems: `./automate-job-request.sh`
    - On Windows (Git Bash): `sh automate-job-request.sh`

## Potential Improvements

1. **Database**:

    - Add a database to store the data and ORM to help manage the data.

2. **API Documentation**:

    - Add Swagger documentation to the API.

3. **Endpoints**:

    - Add more endpoints to the API.
    - Add a endpoint to manage(get, update, delete) vendors, jobs, categories and
      locations.

4. **Code**:
    - Improve code quality and add more tests.
    - Add pagination to potential vendors endpoint.
    - Improve error handling.
    - Add a better authentication method.
    - Add Health Checks
