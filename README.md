# Auth App

Web application created to learn how authentication (using cookies) and protected routes works.

## To Do's

- [x] Upload user image.
- [x] Update user personal info.

## Built With

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [MongoDB](https://www.mongodb.com/)

## How to use

```bash
# Clone this repository
git clone https://github.com/pablovrl/auth-app.git

# Enter in root directory
cd auth-app

# Install dependencies
npm install
```

Before running the app, we need to define the environment values, in the `.env.local` file you can add this variables:

- MONGODB_URI
- MONGODB_DB_NAME
- JWT_SECRET
- DEV_URL
- PROD_URL

```bash
# Run the app in development mode
npm run dev
```

If you want a production build of the app, you need to use:

```bash
# Create a production build of the app
npm run build

# Run the production server
npm run start
```
