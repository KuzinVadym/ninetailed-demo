import {nanoid} from 'nanoid';
import {Connection, WorkflowClient} from '@temporalio/client';
import {WorkflowResultType} from '@temporalio/workflow';
import {
    getSpacesWorkflow,
    getEnvironmentsWorkflow,
    createContentTypeWorkflow,
    getContentTypesWorkflow,
    deleteContentTypeWorkflow,
    getSpacesAndEnvironmentWorkflow,
    createEntryWorkflow,
    getContentTypeWorkflow, activateContentTypeWorkflow
} from './workflows';


class TemporalioClient {
    private client: WorkflowClient | undefined;
    constructor() {
        this.init()
            .then(() => {
                console.log('TemporalioClient successfully started');
            })
            .catch((err) => {
                console.log('TemporalioClient failed to start');
                console.log(err.message);
            });
    }

    private init = async (): Promise<void> => {
        const connection = await Connection.connect();

        this.client = new WorkflowClient({
            connection,
        });
    }
    // getting all todos
    executeGetSpacesAndEnvironmentWorkflow = async (
        args: [],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(getSpacesAndEnvironmentWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeGetContentTypesWorkflow = async (
        args: [],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(getContentTypesWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeDeleteContentTypeWorkflow = async (
        args: [],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(deleteContentTypeWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeGetContentTypeWorkflow = async (
        args: [{
            spaceId: string,
            environmentId: string
        }],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(getContentTypeWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeCreateContentTypeWorkflow = async (
        args: [{
            spaceId: string,
            environmentId: string
        }],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(createContentTypeWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeActivateContentTypeWorkflow = async (
        args: [{
            spaceId: string,
            environmentId: string
            contentTypeId: string
        }],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(activateContentTypeWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeCreateEntryWorkflow = async (
        args: [{
            spaceId: string,
            environmentId: string
            contentTypeId: string
        }],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(createEntryWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

    executeGetSpacesWorkflow = async (
        args: [],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(getSpacesWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };
    executeGetEnvironmentsWorkflow = async (
        args: [],
    ) => {
        const handle: WorkflowResultType<any> = await this.client?.start(getEnvironmentsWorkflow, {
            args,
            taskQueue: 'contentful-workflows',
            // in practice, use a meaningful business id, eg customerId or transactionId
            workflowId: 'workflow-' + nanoid(),
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await handle.result();
    };

}

export const temporalioClient = new TemporalioClient();