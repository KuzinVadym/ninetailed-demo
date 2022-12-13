# Hello World

This is the default project that is scaffolded out when you run `npx @temporalio/create@latest ./myfolder`.

The [Hello World Tutorial](https://docs.temporal.io/typescript/hello-world/) walks through the code in this sample.

### Running this sample

1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/server/quick-install/)).
1. Add .env with 
  SERVER_PORT=****
  CONTENT_MANAGEMENT_API_KEY=*********
1. `yarn` to install dependencies.
1. `yarn start.watch` to start the Worker.
1. In another shell, `yarn start.server` to run the Workflow Client.
   I prepare 2 end points for use cases
      GET http://localhost:<SERVER_PORT>/api/case1 (Content type collection / Create a content type)
      GET http://localhost:<SERVER_PORT>/api/case2 (Entries collection / Create an entry)
   I know this is super fancy naming ))) sorry for this. Second useCase return fith status false in purpose
   

The Workflow should return:

```bash
Hello, Temporal!
```
