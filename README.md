## KEA - 2nd Semester Project

# Music Artist Showcase Backend

## Project website - Deployed on Azure
https://musicbase-backend-madeinchina.azurewebsites.net/ 

## Link to frontend repository

https://github.com/Dennis2300/music-base-frontend/


## Technologies Used

- **Node.js**: A runtime environment for executing JavaScript on the server.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MySQL**: A relational database management system for storing artist, album, and song data.
- **Azure**: Cloud hosting platform used for deploying the backend of the application.

## Running the project locally

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. Clone the backend repository:

    - **SSH**: `git clone git@github.com:abedassoum/music-base-backend.git`
    - **HTTPS**: `git clone https://github.com/abedassoum/music-base-backend.git`

2. Install the project dependencies:

    Navigate to the project directory and run
      ```
      npm install
      ```

3. Create a `.env` file in the project root directory and add the following environment variables:

    ```
    MYSQL_HOST: localhost
    MYSQL_PORT: 3306
    MYSQL_USER: root
    MYSQL_PASSWORD: ****  // Replace **** with your MySQL root user password
    MYSQL_DATABASE: example_db  // Replace example_db with the name of your MySQL database
    PORT : 3000
    ```
4. Start the backend server:
  
      Navigate to the project directory and run
      ```
      npm start
      ```

      #### Run development server with nodemon
      ```
      npm run dev
      ```
5. The backend server should now be running on `http://localhost:3000`.
