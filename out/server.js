import { createServer } from 'http';
import { existsSync, readFileSync } from 'fs';
import * as mime from 'mime';
function serveFile(root, url, defaultFile, response, statusCode = 200) {
    if ('/' === url) {
        url = `/${defaultFile}`;
    }
    const filePath = `${root}${url}`;
    if (!existsSync(filePath)) {
        return false;
    }
    const data = readFileSync(filePath);
    const ext = filePath.split('.').pop() || '';
    // @ts-ignore
    const mimeType = mime.default.getType(ext) || '';
    response.writeHead(statusCode, { 'content-type': mimeType });
    response.end(data);
    return true;
}
const requestListener = function (req, res) {
    if (!serveFile('./out/www/', req.url || '', 'index.html', res, 200)) {
        serveFile('./out/www/', req.url || '', '404.html', res, 404);
    }
};
const server = createServer(requestListener);
server.listen(8080);
console.log('listening to port 8080');
//# sourceMappingURL=server.js.map