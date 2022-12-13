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
