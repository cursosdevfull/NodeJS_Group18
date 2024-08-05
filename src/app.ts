import fs from "node:fs";
import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

export function listUsers(request: IncomingMessage, response: ServerResponse) {
  response.writeHead(200, {
    "Content-type": "application/json; chartset=utf8",
  });
  response.write(JSON.stringify(["user01", "user02", "user03"]));
  response.end();
}

export function listProducts(
  request: IncomingMessage,
  response: ServerResponse
) {
  response.writeHead(200, {
    "Content-type": "application/json; chartset=utf8",
  });
  response.write(JSON.stringify(["product01", "product02", "product03"]));
  response.end();
}

export function testing(request: IncomingMessage, response: ServerResponse) {
  response.writeHead(200, {
    "Content-type": "text/plain; chartset=utf8",
  });
  const content = fs.readFileSync("src/public/todos-testing.txt", "utf8");
  response.write(content);
  response.end();
}

export function testingAsync(
  request: IncomingMessage,
  response: ServerResponse
) {
  fs.readFile("src/public/todos-testing.txt", "utf8", (err, content) => {
    if (err) {
      response.writeHead(500, {
        "content-type": "text/plain; charset=utf8",
      });
      response.write("An error has ocurred");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-type": "text/plain; chartset=utf8",
      });
      response.write("Línea 1\n");
      response.write("Línea 2\n");
      response.end(content);
    }
  });
}

export function getPdf(request: IncomingMessage, response: ServerResponse) {
  const pathFile = path.resolve(path.join(__dirname, "public", "manual.pdf"));
  console.log("pathFile", pathFile);
  //fs.readFile(__dirname + "/public/manual.pdf", (err, content) => {
  fs.readFile(pathFile, (err, content) => {
    if (err) {
      response.writeHead(500, {
        "content-type": "text/plain; charset=utf8",
      });
      response.write("An error has ocurred");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-type": "application/pdf",
      });
      response.end(content);
    }
  });
}

export function getPdf2(request: IncomingMessage, response: ServerResponse) {
  const pathFile = path.resolve(
    //path.join(__dirname, "..", "pdfs", "manual.pdf")
    path.join(__dirname, "..", "pdfs/manual.pdf")
  );
  console.log("pathFile", pathFile);
  //fs.readFile(__dirname + "/public/manual.pdf", (err, content) => {
  fs.readFile(pathFile, (err, content) => {
    if (err) {
      response.writeHead(500, {
        "content-type": "text/plain; charset=utf8",
      });
      response.write("An error has ocurred");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-type": "application/pdf",
      });
      response.end(content);
    }
  });
}

export function getVideo(request: IncomingMessage, response: ServerResponse) {
  const pathFile = path.resolve(path.join(__dirname, "public/Clase04.mp4"));
  console.log("pathFile", pathFile);
  const read = fs.createReadStream(pathFile);
  response.writeHead(200, { "content-type": "video/mp4" });
  read.pipe(response);
}

export function getHtml(request: IncomingMessage, response: ServerResponse) {
  response.writeHead(200, { "Content-type": "text/html; charset=utf8" });
  response.write("<h1>Hola mundo</h1>");
  response.end();
}

export function getFrontend(
  request: IncomingMessage,
  response: ServerResponse
) {
  response.writeHead(200, { "Content-type": "text/html; charset=utf8" });
  fs.readFile(
    path.resolve(path.join(__dirname, "public", "index.html")),
    "utf8",
    (err, content) => {
      response.write(content);
      response.end();
    }
  );
}

export function pathNotFound(
  request: IncomingMessage,
  response: ServerResponse
) {
  response.writeHead(404, { "Content-type": "text/plain; charset=utf8" });
  response.write("Not found");
  response.end();
}

type Route = {
  url: string;
  handler: (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) => void;
};

type Routes = Route[];

const routes: Routes = [
  { url: "/users", handler: listUsers },
  { url: "/products", handler: listProducts },
  { url: "/testing", handler: testing },
  { url: "/testing-async", handler: testingAsync },
  { url: "/pdf", handler: getPdf },
  { url: "/pdf-2", handler: getPdf2 },
  { url: "/video", handler: getVideo },
  { url: "/html", handler: getHtml },
  { url: "/frontend", handler: getFrontend },
];

export type App = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void;

const app: App = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  console.log("URL", request.url);

  const route = routes.find(
    (route: Route) => route.url === request.url?.toLowerCase()
  );

  if (route) {
    route.handler(request, response);
  } else {
    pathNotFound(request, response);
  }

  /* if (request.url === "/users") {
      listUsers(request, response);
    } else if (request.url === "/products") {
      listProducts(request, response);
    } else if (request.url === "/testing") {
      testing(request, response);
    } else if (request.url === "/testing-async") {
      testingAsync(request, response);
    } else if (request.url === "/pdf") {
      getPdf(request, response);
    } else if (request.url === "/pdf-2") {
      getPdf2(request, response);
    } else if (request.url === "/video") {
      getVideo(request, response);
    } else if (request.url === "/html") {
      getHtml(request, response);
    } else if (request.url === "/frontend") {
      getFrontend(request, response);
    } else {
      pathNotFound(request, response);
    }*/

  /*       response.writeHead(200, { "Content-type": "text/plain; charset=utf8" });
    response.write("Hola ¿cómo estás?");
    response.end(); */
};

export default app;
