# GYM Membership

This system provides a comprehensive solution for managing user memberships, with a focus on easy user registration, membership plans, and payment control. Whether you're an admin overseeing user accounts or a user looking to purchase a membership,

## Installation Steps

To run the locally hosted Node.js API with role-based authentication, follow these steps:

1. Ensure Node.js is installed on your machine.
2. Clone this repository to your local machine using the following command:
   ```bash
    git clone https://github.com/Muhammed-Rizin/Gym-membership-mangment-backend.git
3. Install the required dependencies using npm:
    ```bash
    npm install
4. Create a `.env ` file to securely store API keys.
    ```bash
    MONGO_URL='your_mongo_db_connection_string'
    PORT=3000
    ORIGIN='http://your-allowed-origin.com'
    JWT_SECRET='your_jwt_secret_key'
5. Run the app:
    ```bash
    npm start
6. The API is set to run on https://localhost:5000.