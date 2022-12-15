import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

export interface IResponse {
  status: boolean;
  response?: any
  error?: string
}

const {
  getSpaces,
  getEnvironments,
  createContentType,
  getContentTypes,
  getContentTypeById,
  deleteContentType,
  getSpacesAndEnvironment,
  createEntry,
  createEntryWithId,
  getContentType,
  activateContentType,
  createContentTypeWithId
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 1,
    maximumAttempts: 15,
    nonRetryableErrorTypes: ['NonRetryableError']
  }
});

export async function getSpacesAndEnvironmentWorkflow(): Promise<IResponse> {
  try {
    const spacesAndEnvironment = await getSpacesAndEnvironment();
    return {
      status: true,
      response: spacesAndEnvironment
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function getContentTypeWorkflow(payload: {
  spaceId: string;
  environmentId: string;
}): Promise<IResponse> {
  try {
    const contentType = await getContentType(payload);
    return {
      status: true,
      response: contentType
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function getContentTypesWorkflow(): Promise<IResponse> {
  try {
    const contentTypes = await getContentTypes();
    return {
      status: true,
      response: contentTypes
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}
export async function getContentTypeByIdWorkflow(payload: {
  spaceId: string;
  environmentId: string;
  contentTypeId: string;
}): Promise<IResponse> {
  try {
    const contentTypes = await getContentTypeById(payload);
    return {
      status: true,
      response: contentTypes
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function createContentTypeWorkflow(payload: {
  spaceId: string;
  environmentId: string
}): Promise<IResponse> {
  try {
    const contentType = await createContentType(payload);
    return {
      status: true,
      response: contentType
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function activateContentTypeWorkflow(payload: {
  spaceId: string;
  environmentId: string
  contentTypeId: string
}): Promise<IResponse> {
  try {
    const entry = await activateContentType(payload);
    return {
      status: true,
      response: entry
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function createEntryWorkflow(payload: {
  spaceId: string;
  environmentId: string
  contentTypeId: string
}): Promise<IResponse> {
  try {
    const entry = await createEntry(payload);
    return {
      status: true,
      response: entry
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function createContentTypeAndEntryWorkflow(payload: {
  spaceId: string;
  environmentId: string
  contentTypeId: string
  entityId: string
}): Promise<IResponse> {
  try {

    const {spaceId, environmentId, contentTypeId} = payload;
    //getContentType
    const contentType = await getContentTypeById({spaceId, environmentId, contentTypeId})

    if(!contentType){
      //create contentType
      const contentType = await createContentTypeWithId({spaceId, environmentId, contentTypeId});

      if(contentType && !contentType.sys.publishedVersion){
        //activate contentType
        await activateContentType({spaceId, environmentId, contentTypeId});
      }
    } else {
      if(!contentType.sys.publishedVersion){
        //activate contentType
        await activateContentType({spaceId, environmentId, contentTypeId});
      }
    }
    const newEntry = await createEntryWithId(payload);
    console.log('newEntry');
    console.log(newEntry);
    return {
      status: true,
      response: newEntry
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function deleteContentTypeWorkflow(): Promise<IResponse> {
  try {
    const result = await deleteContentType();
    return {
      status: true,
      response: result
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function getSpacesWorkflow(): Promise<IResponse> {
  try {
    const spaces = await getSpaces();
    return {
      status: true,
      response: spaces
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}

export async function getEnvironmentsWorkflow(): Promise<IResponse> {
  try {
    const envs = await getEnvironments();
    return {
      status: true,
      response: envs
    }
  } catch (error: any){
    return {
      status: false,
      error: error.message
    }
  }
}
