/**
 * Class to manage credentials with the web authn API
 */
class CredentialManager {
    constructor() {}

    /**
     * Create a new credential with the web authn API
     * requestResponse: the response from the server
     * @param {string} requestResponse 
     * @returns {Promise<string>}
     */
    async createCredential(requestResponse) {}
    /** 
     * Get the credential with the web authn API
     * requestResponse: the response from the server
     * @param {string} requestResponse
     * @returns {Promise<string>}
    */
    async getCredential(requestResponse) {}
}

export default CredentialManager;