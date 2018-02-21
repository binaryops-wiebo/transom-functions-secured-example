# TransomJS Secured Functions
### Example

Same as the [simple example](https://github.com/binaryops-wiebo/transom-functions-simple-example), however this time the functions are secured using the transom-mongoose-localuser plugin.

## Usage
Clone the repo and run `npm install`.
Update scripts section of the package.json file, to use the connect string to your mongoDb instance. You can get a free sandbox database at [mLab](https://www.mlab.com) 

## Running the example
Run `npm start`. This will initialize the users and groups collection in the database. The default Administrator account is created with `password` as the password.
Since logging in required a POST request, a simple HTML file is included to login, using the transom-scaffold plugin. Browse to [http://localhost:7070/html/sample.html](http://localhost:7070/html/sample.html) to access the page. 

The administrator credentials are defaulted. Go ahead and click the 'Call Function' button before and after logging in.

Also note that the [hello world](http://localhost:7070/api/v1/fx/hello) is still available as the anonymous user.  
