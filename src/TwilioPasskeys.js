/*
 * Copyright © 2025 Twilio Inc.
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

import CredentialManager from './CredentialManager';
import CreatePasskeysResult from './models/CreatePasskeysResult';
import AuthenticatePasskeysResult from './models/AuthenticatePasskeysResult';
import ConfigurationPasskeysRequest from './models/ConfigurationPasskeysRequest';
import {
    mapToPasskeysCreationResponse,
    mapToPasskeysAuthenticationResponse,
    mapToPasskeyCreationPayload,
    mapToPasskeyAuthenticationPayload
} from './utils/mappers';

/**
 * Class to manage Twilio Passkeys SDK
 */
class TwilioPasskeys {
    /**
     * Constructor for TwilioPasskeys
     * @param {ConfigurationPasskeysRequest} config
     */
    constructor(config = new ConfigurationPasskeysRequest(false, false)) {
        this.credentialManager = new CredentialManager();
        this.config = config;
    }

    /**
     * @async
     * @returns {Promise<{
     * supportWebAuthn: boolean, // is WebAuthn supported
     * supportPlatformAuth: boolean, // is platform authenticator supported
     * supportConditionalUI: boolean // is conditional UI supported
     * }>}
     */
    async isPasskeysSupported() {
        return await this.credentialManager.isPasskeysSupported();
    }

    /** @typedef {import("./models/CreatePasskeysRequest").CreatePasskeysRequest} CreatePasskeysRequest */

    /**
     * @param {string | CreatePasskeysRequest} challengePayload
     * @returns {Promise<CreatePasskeysResult>}
     */
    async create(challengePayload) {
        let result = new CreatePasskeysResult();

        if (typeof(challengePayload) === 'string') {
            challengePayload = mapToPasskeyCreationPayload(challengePayload)
        }

        try {
            let credential = await this.credentialManager.createCredential(challengePayload);
            result.Success = mapToPasskeysCreationResponse(credential);
        } catch (error) {
            result.Error = error;
        }
        return result;
    }

    /** @typedef {import("./models/AuthenticatePasskeysRequest").AuthenticatePasskeysRequest} AuthenticatePasskeysRequest */

    /**
     * @param {string | AuthenticatePasskeysRequest} authenticationRequest
     * @returns {Promise<AuthenticatePasskeysResult>}
    */
    async authenticate(authenticationRequest) {
        let result = new AuthenticatePasskeysResult();

        if (typeof(authenticationRequest) === 'string') {
            if(this.config.identityRequirement) {
                if(JSON.parse(authenticationRequest).entity_sid === '') {
                    result.Error = new Error('Entity is required for your configuration.');
                    return result;
                }
            }

            if (this.config.factorRequirement) {
                if (JSON.parse(authenticationRequest).factor_sid === '') {
                    result.Error = new Error('Factor is required for your configuration.');
                    return result;
                }
            }
            authenticationRequest = mapToPasskeyAuthenticationPayload(authenticationRequest);
        }

        try {
            let credential = await this.credentialManager.getCredential(authenticationRequest);
            result.Success = mapToPasskeysAuthenticationResponse(credential);
        } catch (error) {
            result.Error = error;
        }
        return result;
    }
}

export default TwilioPasskeys;
