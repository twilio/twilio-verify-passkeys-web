/*
 * Copyright © 2024 Twilio Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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