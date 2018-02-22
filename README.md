## Server Functions - Secured
### Secured TransomJS Server Functions example

In this example we create a TransomJS server and use the [transom-server-functions](https://transomjs.github.io/docs/transom-server-functions/) plugin to create an endpoint for a your custom function. The function will be secured using the [transom-mongoose-localuser](https://transomjs.github.io/docs/transom-mongoose-localuser/) plugin. We will host a little html page to facilitate the login using the [transom-scaffold](https://transomjs.github.io/docs/transom-scaffold/) plugin.
This example demonstrates how you can use your own custom code as a secured endpoint in the API. Your custom code runs in the context of the TransomJS server, and has access to the entire server context. The plugins take care of securiing your new function. The user needs to be authenticated and authorized to call your function. In this example we just use the default administrator user.

### Run the example
Clone the `transom-functions-secured-example` GitHub repository and install the dependencies with npm. 
```bash
$ git clone git@github.com:binaryops-wiebo/transom-functions-secured-example.git
$ cd transom-functions-secured-example
$ npm install
```

You'll need to have access to MongoDb for this example. If you don't already have it running locally, you can [download](https://www.mongodb.com/download-center#community) and install it, or get a free sandbox database at [mLab](https://www.mlab.com) among others. Update the `package.json` file `scripts` section to use the connect string to your mongoDb instance.

Use `npm start` to run the api server. The server will start on the localhost, on port 7070 and the login page will be available at http://localhost:7070/html/sample.html 
```bash
$ npm start
```
 
### Details
The first time you run the example, it will create a new database and initialize the users and groups collections. The default Administrator account is created with `password` as the password. These credentials are provided for you in the login form on the sample page.

The `myApi.js` file contains the implementation and details of the server function. We're still just multiplying by ten, like we did in the [simple example](https://transomjs.github.io/docs/server-functions-example/). However, this time the `acl` property specifies that the user needs to be member of the either the `sysadmin` group or the `examplegroup`. If the `timesten` endpoint is called without an authenticated session then the request will fail with a 401 (Unauthorized) error. If the authenticated user is not member of at least one of those groups, then the request will fail with a 403 (Forbidden).
``` Javascript
// myApi.js
timesten: {
  methods: ["GET"],
  "function": function(server, req, res, next) {
    if (req.params["val"]){
      const v = Number.parseFloat(req.params["val"]);
      res.send(v + " times ten is " + (v*10) );
      next();
    }	
  },
  acl: {
    groups: ["sysadmin","examplegroup"]
  } 
}
```
### Logging in
A POST request is made on the /user/login end-point, using Basic Authentication. This returns a token which must be supplied in the Authorization header as a `Bearer` token on subsequent requests, includind the `timesten` end-point.

> Note that the [hello world](http://localhost:7070/api/v1/fx/hello) route is still available to users who are not logged in. 
> In this case, the Anonymous user is applied to the request and permissions for that user will be validated against the endpoint.

### See Also
A [simple version](https://transomjs.github.io/docs/server-functions-example/) of this example, without security, and without using MongoDb, is also available. However, server functions really shine in combination with other plugins. In the [socketio-example](https://transomjs.github.io/docs/socketio-example/) we demonstrate how you can send asynchronous messages from within a server function, it could be useful to provide a progress indicator on long running processes, or in multi-user scenarios where users need to be aware of the activities of another user.