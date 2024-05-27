import { mapToPasskeyCreationPayload, mapToPasskeyAuthenticationPayload } from "./utils/mappers";

/**
 * Class to manage credentials with the web authn API
 */
class CredentialManager {
    constructor() {}

    /**
     * Create a new credential with the web authn API
     * requestResponse: the response from the server
     * @param {CreatePasskeysRequest} createRequest 
     * @returns {Promise<?Credential>}
     */
    async createCredential(createRequest) {
        const createCredentialDefaultArgs = {
            publicKey: createRequest
        }

        let credential = await navigator.credentials.create(createCredentialDefaultArgs);
        return credential;
    }
    /** 
     * Get the credential with the web authn API
     * requestResponse: the response from the server
     * @param {AuthenticatePasskeysRequest} createRequest
     * @returns {Promise<?Credential>}
    */
    async getCredential(createRequest) {
        const authenticationRequest = createRequest;
        let credential = await navigator.credentials.get(authenticationRequest);

        return credential;
    }
}

export default CredentialManager;