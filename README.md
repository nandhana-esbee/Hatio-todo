                      
<br/>
<div align="center">

#Todo APP
## An application to manage todos created as part of Hatio 'Take home challenge'.

<br/>

 ## About The Project
 </div>
 
 ### Register Page
![Register page](https://github.com/user-attachments/assets/8e6e85b1-fc06-4cc4-9741-d0866b3c3320)
### Login Page
![Login Page](https://github.com/user-attachments/assets/171011ce-27e5-45d0-9441-0c792a2b20c4)
### Project List Page
![Project List Page](https://github.com/user-attachments/assets/96fd715a-7022-46a3-89d7-a65c38f4e511)

### Todo List Page
![Todo List Page](https://github.com/user-attachments/assets/38d6dd81-cece-4d8f-b624-5503b64e2c2e)





This project is a comprehensive task management application developed using React JS for the frontend with semantic ui package and Django Rest Framework for the backend, with PostgreSQL serving as the database.
Users can register and log in to the application, with authentication managed through SimpleJWT. Once authenticated, users can create and manage projects, each of which can have multiple to-dos. Users can update project names, add new to-dos, edit existing ones,delete them and export Todo summary markdown as secret gists on github. This functionality ensures a seamless and organized approach to task management, with a robust authentication mechanism to secure user data and actions.
 ### Built With

- [React JS](https://react.dev/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org)
- [Semantic UI](https://semantic-ui.com/)
 ## Getting Started

Inorder to run the whole application first you need to start the backend server then run the frontend.
 ### Prerequisites

Inorder to run the application you should install the following:
- Python
- Postgres
- Node.js
- Npm
 ### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nandhana-esbee/Hatio-todo.git
   ```
2. Create a virtual environment and activate
   ```sh
   python -m venv yourvenv
   ```
   To activate in windows cmd:
   ```
   cd yourvenv/Scripts
   ```
   then type:
   ```
   activate
   ```
   Now do twice :
   ```
   cd ..
   ```
   For other platforms read : https://docs.python.org/3/library/venv.html
   
4. Go to server folder
   ```sh
   cd Server
   ```
5. Install requirements in requirements.txt
    ```sh
    pip install -r requirements.txt
    ```
6. Enter your env variables inside .env file
   ```sh
   #POSTGRES credentials for the database
    POSTGRES_DB=your DB name
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=Your postgresql password
    POSTGRES_HOST=your host(eg : localhost)
    POSTGRES_PORT=portnumber(eg:5432)
   ```
7. Run the django app using
   ```sh
   python manage.py runserver
   ```
8. Open new terminal and open client folder. Run the APP.

   ```sh
    cd client
    npm start
    ```

 ## Testing

   ```sh
   not added yet

   ```
