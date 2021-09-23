// HTTP
const http = require("http");
const fs = require("fs/promises");

const PORT = 8081;

const requestHandler = async (request, response) => {
  //   response.writeHead(200, { "Content-type": "text/html" });
  //     response.end("<h1>GOIT</h1>");

  //   if (request.url.indexOf("/home") >= 0) {
  //     response.writeHead(200, { "Content-type": "text/json" });
  //     return response.end('{"url": "homepage"}');
  //   }
  //   response.writeHead(200, { "Content-type": "text/json" });
  //   return response.end('{"url": "other"}');

  const manifest = await fs.readFile("./package.json", "utf8");
  response.writeHead(200, { "Content-type": "text/json" });
  return response.end(manifest);
};

const server = http.createServer(requestHandler);

// http - 80
// https - 443
server.listen(PORT, (error) => {
  if (error) {
    console.error("Error at server launch:", error);
  }
  console.log(`Server works at port ${PORT}`);
});
