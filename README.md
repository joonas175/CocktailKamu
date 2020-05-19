# CocktailKamu

Live demo: http://ck.salojj.fi
 
Database schemas can be found in ```database/schemas``` folder.
Run ```yarn build-web``` in root folder to create production mode frontend.
Express.js server serves static files.

Backend breaks with Node 13.x, use Node 14.x!


# Steps to build and run

1. Install mariadb, run queries from database/schemas (use HeidiSQL to make your life easier)

2. Update database info to ```database/DatabaseLayer.js```

3. Run yarn install / npm install in root folder and in ckweb folder

4. (YARN) run ````yarn build-web``` in root folder (builds frontend for production)

5. (NPM) cd to ckweb and run ```npm run ng build --prod --base-href /```. If not working I suggest installing yarn.

6. ```yarn start``` or ```npm start``` in root folder

7. If you want to enable login, follow these steps:
  - https://console.developers.google.com/
  - Create new project, create OAuth credentials on Credentials tab
  - Redirect uri should end with /login
  - Update environment.js with values from your new project


# Todo

- Automatically update database from node

- Bugfix everything
  - Logout

- Make UI great again

- Cleanup backend code
  - Reusable code cleanup
  - Alternative for native queries?

- Error handling!

- Contribution only available to logged in users

- Only show verified recipes and ingredients!