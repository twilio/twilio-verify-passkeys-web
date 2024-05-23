import { mapToPasskeyCreationPayload, mapToPasskeyAuthenticationPayload } from "./utils/mappers";

/**
 * Class to manage credentials with the web authn API
 */
class CredentialManager {
    constructor() {}

    /**
     * Create a new credential with the web authn API
     * requestResponse: the response from the server
     * @param {string} requestResponse 
     * @returns {Promise<?Credential>}
     */
    async createCredential(requestResponse) {
        const createCredentialDefaultArgs = {
            publicKey: mapToPasskeyCreationPayload(requestResponse)
        }

        let credential = await navigator.credentials.create(createCredentialDefaultArgs);
        return credential;
    }
    /** 
     * Get the credential with the web authn API
     * requestResponse: the response from the server
     * @param {string} requestResponse
     * @returns {Promise<?Credential>}
    */
    async getCredential(requestResponse) {
        const authenticationRequest = mapToPasskeyAuthenticationPayload(requestResponse);
        let credential = await navigator.credentials.get(authenticationRequest);

        return credential;
    }
}

export default CredentialManager;