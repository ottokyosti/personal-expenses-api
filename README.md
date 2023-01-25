# Personal Expenses API
## Backend Development - Final Project
### Author: Otto Kyösti
This project is an API for managing personal expenses. It features capabilities for fetching expense data, both sorted and not sorted, adding new expense data, deleteing expense data and updating specific expense data. This API also has a simple frontend for pleasant user experience.

## Tech/Framework used
Backend utilises these modules:<br/>
    - [express](https://expressjs.com/): The API is built around express and uses it's functions and routes<br/>
    - [joi](https://joi.dev/): This module handles validation for posting and updating expenses<br/>
    - [mysql](https://www.npmjs.com/package/mysql): This module handles SQL querys and data fetching from database<br/>
    - [dotenv](https://www.npmjs.com/package/dotenv): This module handles mysql connection data (user, password, host, database)<br/>
    - [cors](https://www.npmjs.com/package/cors): Middleware that handles cors headers to fetch data from different origin<br/>

Frontend utilises these modules:<br/>
    - [Material-UI](https://mui.com/): Frontend uses mui components to make website look somewhat nice<br/>
    - [axios](https://axios-http.com/docs/intro): This module handles data fetching from the backend<br/>

## Backend
### https://personal-expenses-api.onrender.com/api/expenses/
The backend has these endpoints to handle data:<br/>
    - **GET** /expenses _Returns an array of all expenses_<br/>
    - **GET** /expenses/:month _Returns expenses from specific month_<br/>
    - **GET** /expenses/total _Returns all expenses and total amount of expenses_<br/>
    - **GET** /expenses/sort? _Returns expenses sorted by specific criteria (using a query)_<br/>
    - **POST** /expenses _Posts an expense to the database_<br/>
    - **DELETE** /expenses/:id _Deletes an expenses at a specific id_<br/>
    - **PATCH** /expenses/:id _Updates an expense at a specific id_<br/>

For more detailed information see [documentation](/openapi.yaml)

## Frontend
### https://personal-expenses-api.onrender.com
Frontend is running on a same server that the backend is running
### Instructions
When opening the frontpage of the frontend, user can see list of all expenses and a sorting buttons on the right.
Selecting a month or all expenses will fetch data from backend and show it on the expenses paper. Pressing the "add expense" button will open a dialog to fill all expense fields. When all have been filled, pressing the confirm button will post that expense to the database. Pressing the "total amount" button will show in an alert how much is the total amount of expenses. Every expense has a trash can icon on their cards and pressing it will delete the expense from the database.

## Instructions to run locally
To begin, clone the repository to your computer using `git clone`. Next navigate to the root of the app and type the command `nodemon index.js`. You can find the data by navigating to `http://localhost:5000/api/expenses` or using the [localhost.rest](/localhost.rest) file also found in the root. To start the frontend locally, navigate to frontend folder using `cd frontend` and using command `npm run start`. Locally frontend also uses the render-url for data fetching. The app should automatically open to the url `http://localhost:3000`.
### SQL statements
For sql statements, see [populate_database.sql](/populate_database.sql)

## Documentation
To get the most out of the documentation, navigate to [Swagger](https://editor.swagger.io/) and import _openapi.yaml_ file to the editor.

## Tests
Tests can be run by going to the root of the app and entering the command `npm run test`

## Project evaluation
I used a lot of time on this project and think it went very well. I have implemented all of the endpoints required in the assignment plus the extra endpoint (total amount of expenses). Backend was deployed successfully to Render and endpoints worked perfectly. I also created a simple frontend for viewing, adding and deleting expenses and deployed that to the Render too. At the time of writing this, the application works perfectly.

    1. Solution Design: Rating: 20 => Solution is well thought out
    2. Execution: Rating: 30 => Backend is deployed to a hosting service, reachable and responds correctly to API requests
    3. Requirements Satisfaction: Rating: 20 => Backend implementation satisfies requirements completely and correctly
    4. Coding Style: Rating: 20 => Well-formatted, understandable code; appropriate use of language capabilities
    5. Documentation: Rating: 15 => Concise, meaningful, well- formatted API and README documentation
    6. 🏆 Bonus Credit: Rating: 15 => A deployed frontend implementation using more than 3 of the Backend API endpoints