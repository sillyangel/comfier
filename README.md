[image]()
# Comfier (Fork of Comfi)

### How to run / create a self-hosting instance

1. Create a MongoDB account, free cluster, and add the login to `server/.env`.
2. Create a free Cloudinary account and add the information to `server/.env`.
3. Set the server URL in `client/src/config.js`.
4. Create a JWT token using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
   ```