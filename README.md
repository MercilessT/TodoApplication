# Todo Application

## Project main stack

#### Backend:

Express, Typescript, PostreSql, PrismaORM, Passport.js, Joi.js </br>

#### Frontend:

React, Typescript, Zustand, Formik, Blueprint.js, EmotionCSS.

## Project commands

`cd packages/backend` - jump to your backend folder <br />
`yarn` - install dependencies <br />
`yarn serve` - run your backend <br />
`cd packages/frontend` - jump to your frontend folder <br />
`yarn` - install dependencies <br />
`yarn dev` - run your frontend <br />

## About Application

This application is designed to manage a Todo list.

### Key Features

- **Todo List Management**:

  - Create, Read, Update, Delete (CRUD) operations for managing tasks.
  - Backend validation using Joi.js to ensure data integrity.
  - Separation of concerns with clear architecture: controllers handle routes, services interact with the database.

- **Authentication**:

  - User registration and login using JWT authentication.
  - Secure password handling and storage.
  - Account verification via email and password reset functionality via email.

- **Frontend Implementation**:

  - React-based frontend with Zustand for state management.
  - Forms powered by Formik and Yup for validation.
  - Styled using EmotionCSS for a modular and maintainable CSS-in-JS approach.
  - Responsive design for different devices: desktop, tablet, and mobile.

- **Technologies Used**:
  - Backend: Express, TypeScript, PostgreSQL, PrismaORM, Passport.js, Joi.js.
  - Frontend: React.js, TypeScript, Zustand, Formik, Blueprint.js, EmotionCSS.
