# PeopleBudget

![image of People Budget](https://i.imgur.com/nXYwHLU.png)

PeopleBudget is an interactive mobile-first web application. PeopleBudget is focused on launching
local budget initiatives starting with "Miami Budget" for the City of Miami.

- [GitHub Orginal BudgetParty](https://github.com/open-austin/budgetparty)
- [Requirements](https://docs.google.com/document/d/1vBvvIcOMjzOk5GMc7a5ksjAXZVF7Iv_fPjVjw-IOhmw/edit?usp=sharing)
- [UX Design](https://www.figma.com/file/7cD0SDdL8jFDpT1blgtEm6/Budget-Party-v1-Copy?node-id=0%3A1)
- [App Proof of Concept](https://austinbudget.party/dashboard)
- [City of Miami Data](https://budget.data.miamigov.com/#!/view-data)

This project was inspired by "Austin Budget Party" a project funded by Mozilla with the City of Austin.

- Project Overview

- Tech Overview

- Quickstart

- Installation & Setup
- 1. Clone repository

        ```sh
        git clone https://github.com/Code-for-Miami/peoplebudget
        ```

  2. Install MYSQL https://dev.mysql.com/downloads/mysql/ (note use a password you will remember)
  3. Navigate to project directory and create a .env file

        ```sh
        touch .env
        ```   

  4. Using .env.example as a template, copy fields in your .env and fill out all fields (replace angle brackets)
  5. Run npm setup script

        ```sh
        npm run setup
        ```

  1. Run npm start script

        ```sh
        npm run start:dev
        ```

- Testing & Debugging
  -   NPM run start : will start the server
  -   NPM run setup : setup databases and install dependencies
  -   NPM run migrate:dev : will updates database tables for dev database
  -   NPM run migrate:test : will updates database tables for test database
  -   NPM run migrate:drop : will drop all tables in the dev database
  -   NPM run migrate:drop : will drop all tables in the test database
  -   NPM run start:dev : will start the server with development specific flags
  -   NPM run test : will run the unit tests
  -   NPM run docs : will generate documentations from jsdocs.

- Releasing & Deploying

- Administrative Access
