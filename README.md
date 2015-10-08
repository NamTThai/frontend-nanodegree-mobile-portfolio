## Website Optimization Project

### How to run the application

1. The application is run using `Express` framework for `Node.js`. `Express.js` will create a server allowing for browser caching and gzip compression.
1. Install the latest version of `Node.js`
1. Navigate to project's root and run `npm install`
1. The project uses `gulp` as the task runner. Install `gulp` with `npm`: `npm install -g gulp`
1. Start the application with `gulp serve`. The default port is 3000. It can be changed by setting `NODE_ENV` environment variable. The application can be accessed from a web browser at `localhost:3000/web-obtimization/`
1. To use PageSpeed Insight to assess the application, you can use `ngrok`. E.g. `ngrok http 3000`

### Optimizations on pizza.html

1. The first optimization is in `main.js#updatePositions()`. Here, `Force Synchronous Layout` problem is fixed by reading `document.body.scrollTop` before the applying style change.
1. The second optimization that I made is to promote `.mover` to a different layer in `style.css`, before `.mover.style.left` is change quite often.
1. The third optimization that I made is to reduce the number of `.mover`. `200` movers are not at all necessary. Number of `.mover` necessary is calculated dynamically.

### Optimization on resizing pizza
