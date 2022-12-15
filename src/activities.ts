import {ContentfulClient} from './contentful/client';
import {
  Collection,
  ContentType,
  ContentTypeProps, Entry,
  Environment,
  EnvironmentProps,
  Space,
  SpaceProps
} from 'contentful-management';

const contentfulClient = new ContentfulClient();
export async function getSpaces(): Promise<Collection<Space, SpaceProps>> {
  return contentfulClient.getSpaces();
}

export async function getEnvironments(): Promise<Collection<Environment, EnvironmentProps>> {
  return contentfulClient.getEnvironments();
}

export async function createContentType(payload: {
  spaceId: string;
  environmentId: string
}): Promise<ContentType> {
  return contentfulClient.createContentType(payload);
}

export async function activateContentType(payload: {
  spaceId: string;
  environmentId: string
  contentTypeId: string
}): Promise<boolean> {
  return contentfulClient.activateContentType(payload);
}

export async function createEntry(payload: {
  spaceId: string;
  environmentId: string
  contentTypeId: string
}): Promise<Entry | null> {
  return contentfulClient.createEntry(payload);
}
export async function getContentTypes(): Promise<Collection<ContentType, ContentTypeProps>> {
  return contentfulClient.getContentTypes();
}

export async function deleteContentType(): Promise<boolean> {
  return contentfulClient.deleteContentType();
}
export async function getSpacesAndEnvironment(): Promise<{
  space: Space;
  env: Environment;
}> {
  return contentfulClient.getSpacesAndEnvironment();
}

export async function getContentType(payload: {
  spaceId: string;
  environmentId: string
}): Promise<ContentType> {
  return contentfulClient.getContentType(payload);
}

export async function getContentTypeById(payload: {
  spaceId: string;
  environmentId: string;
  contentTypeId: string;
}): Promise<ContentType | null> {

  return contentfulClient.getContentTypeById(payload);
}

export async function createContentTypeAndEntry(payload: {
  spaceId: string;
  environmentId: string;
  contentTypeId: string;
  entityId: string;
}): Promise<Entry | null> {
  const {spaceId, environmentId, contentTypeId} = payload;
  //getContentType
  const contentType = await contentfulClient.getContentTypeById({spaceId, environmentId, contentTypeId})

  if(!contentType){
    //create contentType
    const contentType = await contentfulClient.createContentTypeWithId({spaceId, environmentId, contentTypeId});

    if(contentType && !contentType.sys.publishedVersion){
      //activate contentType
      await contentfulClient.activateContentType({spaceId, environmentId, contentTypeId});
    }
  } else {
    if(!contentType.sys.publishedVersion){
      //activate contentType
      await contentfulClient.activateContentType({spaceId, environmentId, contentTypeId});
    }
  }

  return contentfulClient.createEntryWithId(payload);
}