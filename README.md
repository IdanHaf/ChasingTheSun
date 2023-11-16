# Project-Name (yet to be specified)

Welcome to our super cool project.

<img src="images/intelligenceMode">

**important notes to all developers**

- To check if user is logged in and access authorized endpoints,
  use localStorage.getItem('token'). If it isn't null, it will contain
  the token that should be sent in the header of the request:
  fetch('api/profile', {
  headers: {Authorization: token}
  })
- To remove the token (logout): localStorage.removeItem('token);

## Install

To install:
```
 git clone https://github.com/OriBenjamin/Intelligence.git
 cd frontend
 npm install
```

If an error occurs, try the recommended solution (usually involves --peep something).

```
 cd ../backend
 npm install
```

Note: MySQL needed to be installed separately.


## Developers usage

To run the application:
```
 cd frontend
 npm start

 cd ../backend
 npm run dev
```

# React-Tailwind

a template repository for React+Tailwind

- npx create-react-app my-app
- cd my-app
- npm install -D tailwindcss
- npx tailwindcss init
- add "./src/\*_/_.{js,jsx,ts,tsx}" in _mudule.exports/content_
- add "@tailwind base; @tailwind components; @tailwind utilities;" in _index.css_
- npm run start
- npm install -g npm-check-updates
- npx ncu
- npx ncu -u
- npm audit
- manual fix of final vulnerabilties in _pacage-lock.json_

**In order to change the project's name:**
change the folder's name + change the _name_ key in package.json + change the _<title>_ in index.html

**for deployment**
get rid of all the commands
get rid of unnecessary tailwind plugins
get rid of css
