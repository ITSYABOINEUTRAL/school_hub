# School Hub

School Hub is a React-based school management dashboard that I have been
building as part of my full-stack learning journey. The frontend
currently contains a login/sign-up screen and a dashboard layout with
summary cards, charts, navigation, and a user profile menu.

## Tech Stack

-   **React 19** --- building the user interface with reusable
    components and React state.
-   **Vite** --- development server and build tool.
-   **Tailwind CSS 4** --- styling and responsive layouts.
-   **Heroicons** --- interface icons.
-   **Recharts** --- line and pie charts.
-   **JSON Server** --- a lightweight local API included for practising
    requests and storing sample user data.
-   **Font Awesome packages** --- included in the project dependencies.

## Features

### Login and Sign-up Screen

-   Switch between login and sign-up modes.
-   Controlled form inputs managed with React `useState`.
-   Basic form validation.
-   Checks existing demo users when logging in.
-   Includes sample demo account details on the login screen.

### Dashboard

-   Sidebar navigation for Dashboard, Students, and Assignments.
-   Top bar with the current page heading.
-   Summary cards for students, teachers, and assignments.
-   Students Overview line chart.
-   Student Distribution pie chart.

### User Profile Menu

-   Displays the signed-in user's profile image.
-   Shows the user's name and role.
-   Provides a logout action that returns to the login screen.

## Project Structure

``` text
school-hub/
├── public/
├── server/
│   └── db.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SideBar.jsx
│   │   │   └── TopBar.jsx
│   │   ├── Cards.jsx
│   │   ├── Charts.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── MainContent.jsx
│   │   └── UserMenu.jsx
│   ├── API.js
│   ├── App.jsx
│   ├── data.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Requirements

-   Node.js
-   npm

### 1. Clone the repository

``` bash
git clone <your-repository-url>
```

### 2. Open the frontend folder

``` bash
cd school-hub
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Vite will print the local URL in the terminal. Open that URL in your
browser.

## Running the Local JSON Server

The project also includes a JSON Server setup and sample user data in
`server/db.json`.

To start it, open a second terminal in the project folder and run:

``` bash
npm run server
```

The script starts JSON Server using `server/db.json` (the API helper
currently points to `http://localhost:3000`).

The API helper file, `src/API.js`, defines functions to:

-   Fetch all users with `getUsers()`.
-   Find a user by email with `findUserByEmail(email)`.
-   Create a user with `createUser(newUser)`.

These helpers are present in the project, but the current
`LoginScreen.jsx` does not yet use them for registration or login.

## Available Scripts

  Command             Description
  ------------------- --------------------------------------------
  `npm run dev`       Starts the Vite development server.
  `npm run server`    Starts JSON Server using `server/db.json`.
  `npm run build`     Creates a production build in `dist/`.
  `npm run preview`   Previews the production build locally.
  `npm run lint`      Runs ESLint.

## Current Project Status

This README describes the frontend source currently available in the
Week 10 School Hub project snapshot.

Some parts of the interface are working as frontend demonstrations,
while other parts are still at an early stage:

-   Login checks the sample users imported from `src/data.jsx`; it does
    not yet authenticate against the JSON Server or the PostgreSQL
    backend.
-   The sign-up form validates the entered details, but it currently
    logs the valid form data to the console instead of creating and
    saving an account.
-   `src/API.js` contains JSON Server request helpers, but they are not
    connected to the login/sign-up flow in this version.
-   Dashboard summary values and chart data are hardcoded sample values.
-   The Students and Assignments sidebar items are currently visual
    navigation items; the supplied frontend does not include their pages
    or working navigation.
-   The profile menu supports displaying the current user's details and
    logging out.

The project is being developed gradually as new frontend and backend
concepts are introduced.

## Notes

-   The JSON Server data in `server/db.json` is sample development data,
    not a production database.
-   The demo accounts and passwords are included for local practice
    only. Do not use these credentials in a deployed application.
-   The frontend and the newer Express/PostgreSQL backend are separate
    parts of the learning project. The current frontend snapshot has not
    yet been connected to that backend's authentication endpoints.
