## About this project

### Description
Web Programming Project -course for spring 2023

A social media app for reviewing restaurants. Users can register, login and add their reviews, along with pictures, rate restaurants, view restaurants' location via umap and OpenStreetMap. Site will also return with recommendations based on top rated restaurants.

### Deployment
This site is deployed via Github Pages in <a href="https://t2haev00.github.io/project-groupd/">here</a>. Database is running at render which can cause some slugginess while fetching the data.

### Roles
- Frontend Developer/Tester: Hua Chen (<a href="https://github.com/balletty2008">balletty2008</a>) 
- Product Owner/Scrum Master: Eveliina Hampus (<a href="https://github.com/t2haev00">t2haev00</a>) 
- Backend Developer: Yerold Sanabria (<a href="https://github.com/doteins">doteins</a>)
- Frontend Developer/Designer: Tomoko Takami (<a href="https://github.com/Tomokazuki">Tomokazuki</a>)

### Technologies and Programming Languages Used
- Node.js
- Git
- Express
- Typescript
- HTML
- CSS (Bootstrap)
- SQL
- PHP

## Development Setup

### Prerequisites
- Node.js
- PostgreSQL: You can find the database schema in the server folder.

### Local setup (Linux & Windows)

1. First, clone the repo and cd into the project:
   ```sh
   git clone https://github.com/t2haev00/project-groupd.git
   ```
   
2. Move to the server directory:
   ```sh
   cd server/
   ```
   
3. Install node dependencies:
   ```sh
   npm i
   ```
   
4. In the server directory, open **sample.env** and copy its content into a new file named **.env**, then replace variable placeholders with the correct values for your database.

### Compile TypeScript code for the server and front-end
Run the following comand in the server and root directory:
   ```sh
   npx tcs
   ```
  
### Run the server locally
In the server directory, start the development server by running:
   ```sh
   npm run devStart
   ```
Backend will be running on **http://localhost:3001** by default, if no value for PORT is passed.

