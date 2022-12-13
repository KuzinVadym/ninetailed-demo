import { config } from 'dotenv';

config();
const env: any = process.env;

export interface ISettings {
    contentManagementApiKay: string
    serverPort: string
}

const settings: ISettings = {
    contentManagementApiKay: env.CONTENT_MANAGEMENT_API_KEY,
    serverPort: env.SERVER_PORT
};

export { settings };
