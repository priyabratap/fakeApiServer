
/* Using express & json-server */

// var express = require('express');
// var jsonServer = require('json-server');

// var server = express();

// server.use('/api',  jsonServer.defaults(), jsonServer.router('db.json'));

// server.listen(3000, function () {
//     console.log("app running on port.", 3000);
// });


/* json-server only, but we can use other Express middlewares */
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
hasErrorInQry = false;
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.listen(3000, () => {
  console.log('JSON Server is running',3000)
})

server.use((req, res, next) => {
  console.log("req.query",req.query);

  hasErrorInQry = (req.query.error !== undefined) ? true : false;

  // if (req.method === 'POST') {
  //   req.body.createdAt = Date.now()
  // }
  // Continue to JSON Server router
  next()
})

/* Not in use right now */
// server.use(jsonServer.rewriter({
//   '/api/*': '/$1',
//   '/blog/:resource/:id/show': '/:resource/:id'
// }))

server.use(router);

router.render = (req, res) => {
    // console.log("render",hasErrorInQry);
    msgBody = "Success";
    resData = res.locals.data;

    if(hasErrorInQry){
      resData = {};
      msgBody = "Failed message";
    }

    res.jsonp({
      data: resData,
      msg: msgBody
    })
  }

 