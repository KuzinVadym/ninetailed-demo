import {temporalioClient} from './TemporalioClient';

export interface IController {
    runTestCase1: () => Promise<boolean>,
    runTestCase2: () => Promise<boolean>,
}
class Controller {
    // getting all todos
    async runTestCase1() {
        // return all todos
        const spacesAndEnvironmentResponse = await temporalioClient.executeGetSpacesAndEnvironmentWorkflow(
            [],
        );

        const { space, env } = spacesAndEnvironmentResponse.response;

        if(space && env) {
            return await temporalioClient.executeCreateContentTypeWorkflow(
                [{
                    spaceId: space.sys.id,
                    environmentId: env.sys.id
                }],
            )
        }

        return null
    }
    async runTestCase2() {
        const spacesAndEnvironmentResponse = await temporalioClient.executeGetSpacesAndEnvironmentWorkflow(
            [],
        );

        const { space, env } = spacesAndEnvironmentResponse.response;

        if(space && env) {
            const contentTypeResponse = await temporalioClient.executeGetContentTypeWorkflow(
                [{
                    spaceId: space.sys.id,
                    environmentId: env.sys.id
                }],
            );

            const contentType = contentTypeResponse.response;

            return await temporalioClient.executeCreateEntryWorkflow(
                [{
                    spaceId: space.sys.id,
                    environmentId: env.sys.id,
                    contentTypeId: '367yLKafE3Iz4TvFJSfAwi'
                }],
            )
        }

        return spacesAndEnvironmentResponse
    }

}

export const controller = new Controller();