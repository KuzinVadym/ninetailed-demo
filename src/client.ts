import { Connection, WorkflowClient } from '@temporalio/client';
import {getEnvironmentsWorkflow, getSpacesWorkflow} from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  // const getSpacesHandle = await client.start(getSpacesWorkflow, {
  //   // type inference works! args: [name: string]
  //   args: [],
  //   taskQueue: 'contentful-workflows',
  //   // in practice, use a meaningful business id, eg customerId or transactionId
  //   workflowId: 'workflow-' + nanoid(),
  // });
  //
  // console.log(`Started workflow ${getSpacesHandle.workflowId}`);
  // // optional: wait for client result
  // console.log(await getSpacesHandle.result());

  const getEnvironmentsHandle = await client.start(getEnvironmentsWorkflow, {
    // type inference works! args: [name: string]
    args: [],
    taskQueue: 'contentful-workflows',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });

  console.log(`Started workflow ${getEnvironmentsHandle.workflowId}`);
  // optional: wait for client result
  console.log(await getEnvironmentsHandle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
