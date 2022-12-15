import {
    ClientAPI,
    Collection,
    ContentType,
    ContentTypeProps,
    createClient, Entry,
    Environment,
    EnvironmentProps,
    Space,
    SpaceProps
} from 'contentful-management';
import {config} from 'dotenv';
import {NonRetryableError} from '../utils/NonRetryableError';

config();

const env: any = process.env;

export class ContentfulClient {
    client: ClientAPI;
    constructor() {
        this.client = createClient({
            accessToken: env.CONTENT_MANAGEMENT_API_KEY
        })
    }

    getSpacesAndEnvironment = async (): Promise<{
        space: Space;
        env: Environment;
    }> => {
        try {
            console.log('getSpacesAndEnvironment');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const spaces = await this.client.getSpaces();
            const envs = await spaces.items[0].getEnvironments()

            return {
                space: spaces.items[0],
                env: envs.items[0]
            }
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    getSpaces = async (): Promise<Collection<Space, SpaceProps>> => {
        try {
            console.log('getSpaces');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }

            return this.client.getSpaces();
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    getContentTypes = async (): Promise<Collection<ContentType, ContentTypeProps>> => {
        try {
            console.log('getContentTypes');
            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const spaces = await this.client.getSpaces();
            const envs = await spaces.items[0].getEnvironments()
            const temp = await envs.items[0].getContentTypes()
            console.log(temp.items);
            return temp
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }

    }

    createContentType = async ({ spaceId, environmentId }: {
        spaceId: string;
        environmentId: string
    }): Promise<ContentType> => {
        try {
            console.log('createContentType');
            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId);

            return await env.createContentType({
                "name": "Blog Post",
                "fields": [
                    {
                        "id": "title",
                        "name": "Title",
                        "required": true,
                        "localized": true,
                        "type": "Text"
                    },
                    {
                        "id": "body",
                        "name": "Body",
                        "required": true,
                        "localized": true,
                        "type": "Text"
                    }
                ]
            });
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }
    createContentTypeWithId = async ({ spaceId, environmentId, contentTypeId }: {
        spaceId: string;
        environmentId: string;
        contentTypeId: string;
    }): Promise<ContentType> => {
        try {
            console.log('createContentTypeWithId');
            if (Math.random() < 0.2){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId);

            return await env.createContentTypeWithId(contentTypeId, {
                "name": "Blog Post",
                "fields": [
                    {
                        "id": "title",
                        "name": "Title",
                        "required": true,
                        "localized": true,
                        "type": "Text"
                    },
                    {
                        "id": "body",
                        "name": "Body",
                        "required": true,
                        "localized": true,
                        "type": "Text"
                    }
                ]
            });
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    deleteContentType = async (): Promise<boolean> => {
        try {
            console.log('deleteContentType');

            const spaces = await this.client.getSpaces();
            const envs = await spaces.items[0].getEnvironments()
            const contentTypes = await envs.items[0].getContentTypes()
            contentTypes.items.filter(item => item.sys.id !== 'product').forEach(item => item.delete())

            return true;
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    getEnvironments = async (): Promise<Collection<Environment, EnvironmentProps>> => {
        try {
            console.log('getEnvironments');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const space = await this.client.getSpaces();

            return space.items[0].getEnvironments();
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }
    getContentType = async ({ spaceId, environmentId }: {
        spaceId: string;
        environmentId: string
    }): Promise<ContentType> => {
        try {
            console.log('getContentType');
            if (Math.random() < 0.8){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId)
            const contentTypes = await env.getContentTypes()
            return contentTypes.items.filter(item => item.sys.id !== 'product')[0]
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    getContentTypeById = async ({ spaceId, environmentId, contentTypeId }: {
        spaceId: string;
        environmentId: string;
        contentTypeId: string;
    }): Promise<ContentType | null> => {
        try {
            console.log('getContentTypeById');
            if (Math.random() < 0.3){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId)
            const contentTypes = await env.getContentTypes()
            const searchedType = contentTypes.items.filter(type => type.sys.id === contentTypeId)[0]
            if(!searchedType){
                return null
            }
            return searchedType
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    activateContentType = async ({ spaceId, environmentId, contentTypeId }: {
        spaceId: string;
        environmentId: string
        contentTypeId: string
    }): Promise<boolean> => {
        try {
            console.log('activateContentType');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId)
            const contentType = await env.getContentType(contentTypeId);
            await contentType.publish();

            return true
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    createEntry = async ({ spaceId, environmentId, contentTypeId }: {
        spaceId: string;
        environmentId: string
        contentTypeId: string
    }): Promise<Entry | null> => {
        try {
            console.log('createEntry');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId);

            return await env.createEntry(contentTypeId, {
                "fields": {
                    "title": {
                        "en-US": "Hello, World!"
                    },
                    "body": {
                        "en-US": "Bacon is healthy!"
                    }
                },
                "metadata": {
                    "tags": [
                        {
                            "sys": {
                                "type": "Link",
                                "linkType": "Tag",
                                "id": "nyCampaign"
                            }
                        }
                    ]
                }
            });
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    createEntryWithId = async ({ spaceId, environmentId, contentTypeId, entityId }: {
        spaceId: string;
        environmentId: string;
        contentTypeId: string;
        entityId: string;
    }): Promise<Entry | null> => {
        try {
            console.log('createEntryWithId');

            if (Math.random() < 0.1){
                throw new Error('oops');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId);

            return await env.createEntryWithId(contentTypeId, entityId,{
                "fields": {
                    "title": {
                        "en-US": "Hello, World!"
                    },
                    "body": {
                        "en-US": "Bacon is healthy!"
                    }
                },
                "metadata": {
                    "tags": [
                        {
                            "sys": {
                                "type": "Link",
                                "linkType": "Tag",
                                "id": "nyCampaign"
                            }
                        }
                    ]
                }
            });
        } catch (error: any) {
            if(error.message === 'oops') throw new Error(error);

            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }
}