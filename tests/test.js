var request = require("request");

request.get('https://api.typephil.org', function(err, res) {
  if(err) process.exit(1);

  if([200, 301, 302, 404].includes(res.statusCode)) {
    console.log("the backend is probably fine, but we'd know more with a test suite");
    process.exit(0);
  }

  process.exit(1);
});
