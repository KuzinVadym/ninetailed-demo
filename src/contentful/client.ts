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
                throw new Error('opps');
            }
            const spaces = await this.client.getSpaces();
            const envs = await spaces.items[0].getEnvironments()

            return {
                space: spaces.items[0],
                env: envs.items[0]
            }
        } catch (error: any) {
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
                throw new Error('opps');
            }

            return this.client.getSpaces();
        } catch (error: any) {
            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }

    getContentTypes = async (): Promise<Collection<ContentType, ContentTypeProps>> => {
        console.log('getContentTypes');
        if (Math.random() < 0.1){
            throw new Error('opps');
        }
        const spaces = await this.client.getSpaces();
        const envs = await spaces.items[0].getEnvironments()
        const temp = await envs.items[0].getContentTypes()
        console.log(temp.items);
        return temp
    }

    createContentType = async ({ spaceId, environmentId }: {
        spaceId: string;
        environmentId: string
    }): Promise<ContentType> => {
        try {
            console.log('createContentType');
            if (Math.random() < 0.1){
                throw new Error('opps');
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
                throw new Error('opps');
            }
            const space = await this.client.getSpaces();

            return space.items[0].getEnvironments();
        } catch (error: any) {
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
                throw new Error('opps');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId)
            const contentTypes = await env.getContentTypes()
            return contentTypes.items.filter(item => item.sys.id !== 'product')[0]
        } catch (error: any) {
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
                throw new Error('opps');
            }
            const space = await this.client.getSpace(spaceId);
            const env = await space.getEnvironment(environmentId)
            const contentType = await env.getContentType(contentTypeId);
            await contentType.publish();

            return true
        } catch (error: any) {
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
                throw new Error('opps');
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
            const currentError = JSON.parse(error.message)
            if(currentError.status === 400){
                throw new NonRetryableError({success: false, status: 400, message: currentError.message})
            }
            throw new Error(error);
        }
    }
}