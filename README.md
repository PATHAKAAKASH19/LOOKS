#  LOOKS
LOOKS is a fully responsive e-commerce Platform with integrated payment gateway built on mern stack . Looks contain features like user dashboard, admin dashboard, cart, whislist, user authentication, seller authentication, payment-gateway, product filtering.  


## 🎯 Demo

### App demo
![e-commerce-app demo](./frontend/public/Screencast%20from%202025-06-11%2014-45-54.gif)



### Admin Dashboard demo
![admin dashboard demo](./frontend/public/Screencast%20from%202025-06-11%2015-00-00.gif)



## Project Link
[http://looks.akash-pathak.xyz](https://looks.akash-pathak.xyz)


## ✨ Features

  1. secure payment gateway
  2. Product filtering
  3. User Dashboard
  4. Admin dashboard
  5. JWT-based authentication 
  6. Responsive UI


## 🛠️ Tech Stack
  
  - **Frontend**: React.js, Css, React-Router
  - **Backend**: Node.js, Express.js, MongoDB, Json-Web-Token, cloudinary  
  - **Payment**: Razorpay payment gateway
  - **Deployment**: AWS (EC2), nginx 


## 🚀 Installation
###  1. Clone repo
     git clone https://github.com/PATHAKAAKASH19/LOOKS

### 2.  Backend setup
    cd backend
    npm run install_backend   # install all backend dependencies
    npm run dev


### 3. Backend .env file
     MONGODB_URI="your_mongodb_url"
     CLOUDINARY_CLOUD_NAME="your_cloud_name" # look at clodinary dashboard
     CLOUDINARY_API_KEY="your_api_key"
     CLOUDINARY_API_SECRET="your_api_secret"
     JWT_SECRET="your_jwt_secret"            # eg "aksmksndsjdnsjnenfecmd349"
     RAZORPAY_KEY_ID="your_razorpay_key"
     RAZORPAY_KEY_SECRET="your_razorpay_sercret"
     FRONTEND_URL="your_frontend_url"         # require in cors  
     PORT="any_port"

### 4. Frontend setup
    cd frontend
    npm run install_frontend  # install all frontend dependencies
    npm run dev

### 5. Frontend .env file     
     VITE_RAZORPAY_KEY_ID="your_razorpay_key" # you get it after creating razorpay account
     VITE_BACKEND_URL="your_backend_url"    # if running locally use localhost as url