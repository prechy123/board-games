# Board Games
A user friendly Real-Time Cross-Platform Application to play different board games(including Tic-Tac-Toe, Chess, Checkers, Scrabble, Ludo e.t.c) with your friends and family. NextJs, NodeJs, React-Native 
![image](https://github.com/user-attachments/assets/9847c80d-5ed5-4960-a0ed-f1d30551c981)

## Features

- **User Profiles:** Create a personalized profile.
- **Real Time:** Get updated values Real-Time without need to refresh page.
- **Board Game:** Play your favourite board games with your friends and family.

## Getting Started

To get a local copy up and running, follow these simple steps.

## 1. Prerequisites
Before you proceed, ensure that you have the following prerequisites installed:

- Node.js and npm: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)
- Git: [Download and Install Git](https://git-scm.com/downloads)

## 2. Project Structure
mern-food-website/  
├── server/  
│   └── ...  
├── client/  
│   └── ...  
├── LICENSE
└── readme.md  



## 3. Setting up the Backend


### Express.js Configuration
Ensure you are using the latest node version 
1. Navigate to the `server` directory: `cd server`.
2. Install dependencies: Run `npm install`.
3. Create a `.env` file in the `backend` directory and add the following environment variables:
```
PORT = 5000  
MONGO_URI = your_mongodb_connection_string  
JWT_SECRET = Your_jwt_secret_phrase  
EMAIL_USER= Your mail for nodemailer email address
EMAIL_PASSWORD= Your nodemailer app password (Note: This is not the email password)
BASE_URL= Your frontend route (e.g. http://localhost:3000)
CLOUDINARY_NAME = Your_cloudinary_name
CLOUDINARY_APIKEY = Your_cloudinary_apikey
CLOUDINARY_APISECRET = Your_cloudinary_apisecret
CLOUDINARY_URL = Your_cloudinay_url
```
Replace `your_mongodb_connection_string` with your MongoDB connection string, and `Your_jwt_secret_phrase` with a secret key for JWT authentication.

4. Configure cloudinary account

5. Start the Express.js server: Run `npm run dev`.

## 4. Setting up the Frontend

1. Navigate to the `client` directory: `cd client`.
2. Install dependencies: Run `npm install`.
3. Create a `.env.local` file in the `client` directory and add the following environment variables:

```
NEXT_PUBLIC_BACKEND_URL = Your server url (e.g. http://localhost:5000)
NEXT_PUBLIC_JWT_SECRET = Your JWT secret
```

4. Start the React frontend: Run `npm run dev`.

## 5. Running the Application
- Access the website at `http://localhost:3000/`.
 

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
If you'd like to contribute to this project, follow the following steps:-   

1. Fork the Project
2. clone the repository
3. Create your Feature Branch (git checkout -b feature/AmazingFeature)
4. Commit your Changes (git commit -m 'Add some Amazing Feature')
5. Push to the Branch (git push origin feature/AmazingFeature)
6. Open a Pull Request

## ScreenShots
### Home Page
![image](https://github.com/user-attachments/assets/979bc136-a15e-48ec-8238-5e7ab6e2db2c)
![image](https://github.com/user-attachments/assets/6e2c7878-1331-42e7-abc6-7194425abb63)

### Profile Page
![image](https://github.com/user-attachments/assets/0db391fb-d076-4a1d-8ffd-2c32d2052452)

### Game Page
![image](https://github.com/user-attachments/assets/dce5d48f-b17a-4d2a-9da8-7a2f5f81a286)
![image](https://github.com/user-attachments/assets/bb4cbde7-a876-4268-8977-57f00d551935)
![image](https://github.com/user-attachments/assets/578970e1-f3ce-428c-94c1-b1788dd537b7)

#### Visit <a href = "https://board-games-two.vercel.app/" target="_blank">Board Games</a>






