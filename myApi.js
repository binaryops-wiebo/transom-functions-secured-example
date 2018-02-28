module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the Server Functions module.",
	name: "My functions Example App",
	transom: {},
	definition: {
		scaffold: {
			staticRoutes: [{
				path: /html\/?.*/,
				folder: 'public-assets'
			}]
		},
		functions: {
			hello: {
				"methods": ["GET"],
				"function": function (server, req, res, next) {
					//do stuff
					res.send("hello world");
					next();
				}
			},
			timesten: {
				methods: ["GET"],
				"function": function (server, req, res, next) {
					if (req.params["val"]) {
						const v = Number.parseFloat(req.params["val"]);
						res.send(v + " times ten is " + (v * 10));
						next();
					}
				},
				acl: {
					groups: ["sysadmin", "examplegroup"]
				}
			}
		}
	}
};