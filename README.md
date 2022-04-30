# weatherService
## **A weather service for checking climates of cities**
## Requirement:
- **MySQL** installed on your machine @8 or higher.
  - **ATTENTION**: Database name must be "weather"
- **Redis** for caching
- **An API key** from [Open Weather Map](https://openweathermap.org)
## How to run
After you installed the requirements make a .env file in the root of project and create a variable name: _API_:_yourAPIKey_.

You can change database configuration in "./services/mySQLController.js
- Run npm run dev

### Swagger
There is an api-doc link in the app that you can visit after running the app at ***/api-docs***

