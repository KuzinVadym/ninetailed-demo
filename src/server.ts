import * as http from 'http';
import { settings } from './settings'
import { controller } from './controller';

const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api/case1" && req.method === "GET") {

        const testCaseResult = await controller.runTestCase1();
        console.log('testCaseResult');
        console.log(testCaseResult);
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({data: testCaseResult}));
    } else if (req.url === "/api/case2" && req.method === "GET") {

        const testCaseResult = await controller.runTestCase2();
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({data: testCaseResult}));
    } else if (req.url === "/api/case3" && req.method === "GET") {

        const testCaseResult = await controller.runTestCase3();
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({data: testCaseResult}));
    } else {

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Let the force be with you' }));
    }
});

server.listen(settings.serverPort, () => {
    console.log(`server started on port: ${settings.serverPort}`);
});