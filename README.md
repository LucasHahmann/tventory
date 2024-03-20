# Tventory - Lightweight IT Device Asset Management System

Tventory is a streamlined Asset Management System designed for efficient management of IT devices within an organization. The system boasts a Vue.js frontend and a Node.js backend powered by Nest.js, with PrismaJS handling the database connection.

## Features (in Development)

-    **Device Inventory:** Effortlessly manage and track IT devices within your organization's ecosystem.
-    **Comprehensive Device Data:** Store detailed information about each device, including specifications, status, and location.
-    **Search and Filtering:** Easily locate devices using search and filter functionalities.
-    **Reporting:** Generate insightful reports on device status, usage patterns, and more for informed decision-making.

## What to do (Frontend)?

### Manufactors

-    [x] Create Manufactor
-    [x] Edit Manufactor
-    [x] Remove Manufactor

### Models

-    [x] Create Model
-    [x] Edit Model
-    [x] Remove Model

### Types

-    [x] Create Type
-    [x] Edit Type
-    [x] Remove Type

### Employees

-    [x] Create Employee
-    [x] Edit Employee
-    [x] Remove Employee

### Buildings

-    [x] Create Building
-    [x] Edit Building
-    [x] Remove Building

## Installation

### Prerequisites

-    Node.js
-    npm or yarn
-    Vue CLI
-    Prisma CLI
-    Docker (for database setup, if applicable)

### Setup Instructions

1. **Backend Setup:**

     ```bash
     cd backend
     npm install   # or `yarn install`
     ```

     ```bash
     npm run start   # or `yarn install`
     ```

     Configure the database connection settings in the `.env` file as specified in the provided `.env.example`.

     ```bash
     npx prisma migrate dev
     npm run start  # or `yarn start`
     ```

2. **Frontend Setup:**

     ```bash
     cd frontend
     npm install   # or `yarn install`
     ```

     Adjust the API endpoint within the frontend code to point to your backend server.

     ```bash
     npm run serve  # or `yarn serve`
     ```

## Usage

Access the application through the specified URL after launching both the frontend and backend servers.

## Contribution

Contributions are not yet welcome. The repo is in an very early state. The project is for me, to learn all the mechanics.
If the repo is in an public ready state, i change this.
