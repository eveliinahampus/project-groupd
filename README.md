## Development Setup

### Prerequisites
- Node.js

### Local setup (Linux & Windows)

1. First, clone the repo and cd into the project:
   ```sh
   git clone https://github.com/doteins/todo.git
   ```
   
2. Move to the server directory:
   ```sh
   cd server/
   ```
   
3. Install node dependencies:
   ```sh
   npm i
   ```
4. In the server directory, open **sample.env** and copy its content into a new file named **.env**, then replace with the correct values for your database.
   
### Run the server locally
In the server directory, start the development server by running:
   ```sh
   npm run devStart
   ```
Backend will be running on **http://localhost:3001**.
