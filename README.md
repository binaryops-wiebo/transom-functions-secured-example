## Server Functions - Secured
### Secured TransomJS Server Functions example

In this example we create a TransomJS server and use the [transom-server-functions plugin](https://transomjs.github.io/docs/transom-server-functions/) to create a server function. The function will be secured using the [transom-mongoose-localuser plugin](https://transomjs.github.io/docs/transom-mongoose-localuser/). We will host a little html to facilitate the login using the [scaffold plugin](https://transomjs.github.io/docs/transom-scaffold/)
This example demonstrates how you can use your own custom code as a secured end point in the API. Your custom code runs in the context of the TransomJS server, and has access to the entire server context. The plugins take care of the security. The user needs to be authenticated and authorized to call your function. In this example we just use the default administrator user.

### Run the example
Clone the repo from `git@github.com:binaryops-wiebo/transom-functions-secured-example.git` and run `npm install`. You'll need a MongoDb for this example. You can [download](https://www.mongodb.com/download-center#community) a copy, or get a free sandbox database at [mLab](https://www.mlab.com) among others. Update scripts section of the package.json file, to use the connect string to your mongoDb instance.
Use `npm start` to run the api server. The API will start on the localhost, on port 7070. The web page will be available at
http://localhost:7070/html/sample.html 
 
### Details
The first time you run the example, it will initialize the users and groups collections in the database. The default Administrator account is created with `password` as the password. These credentials are defaulted on the sample page.

The myApi.js file contains the details of the server function. We're still just multiplying by ten, just like the [simple example](https://transomjs.github.io/docs/server-functions-example/). However, this time the `acl` property specifies that the user needs to be member of the either the `sysadmin` group or the `examplegroup`. If this end point is called without an authenticated session then the request will fail. If the authtenticated user is not member of at least one of those groups, then the request will also fail.
``` Javascript
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

Note that the [hello world](http://localhost:7070/api/v1/fx/hello) is still available as the anonymous user.  

### See Also
The simple version of this example, without security, and without the MongoDb, is available [here](https://transomjs.github.io/docs/server-functions-example/). However, server functions really shine in combination with other plugins. In [this example](https://transomjs.github.io/docs/socketio-example/) we show how you can send asynchronous messages from a function, useful in long running processes, or multi-user scenarios. 