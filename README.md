# Project-Name (yet to be specified)

Welcome to our super cool project.

<img src="images/intelligenceMode.png">


## Install

To install:

```
 git clone https://github.com/OriBenjamin/Intelligence.git
 cd frontend
 npm install
```

If an error occurs, try the recommended solution (usually involves --peer something).

```
 cd ../backend
 npm install
```

Install MySQL and run the 4 blocks of code in intellegence.session.sql to create the db.

Note: Node.js needed to be installed separately.

## Run

To run the application:

```
 cd backend
 npm run devStart

 cd ../frontend
 npm run all
```

## deploy
get rid of all the comments
get rid of unnecessary tailwind plugins
get rid of css - ori is a bully


**important notes to all developers**

- To check if user is logged in and access authorized endpoints,
  use localStorage.getItem('token'). If it isn't null, it will contain
  the token that should be sent in the header of the request:
  fetch('api/profile', {
  headers: {Authorization: token}
  })
- To remove the token (logout): localStorage.removeItem('token);


