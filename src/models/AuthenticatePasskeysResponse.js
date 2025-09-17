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

/**
 * Class that containe the response form of authenticate passkeys
 */
class AuthenticatePasskeysResponse {
    /**
     *
     * @param {string} id
     * @param {string} rawId
     * @param {?string} authenticatorAttachment
     * @param {string} type
     * @param {string} clientDataJSON
     * @param {string} authenticatorData
     * @param {string} signature
     * @param {string} userHandle
     */
    constructor(id, rawId, authenticatorAttachment, type, clientDataJSON, authenticatorData, signature, userHandle) {
        this.id = id;
        this.rawId = rawId;
        this.authenticatorAttachment = authenticatorAttachment;
        this.type = type;
        this.clientDataJSON = clientDataJSON;
        this.authenticatorData = authenticatorData;
        this.signature = signature;
        this.userHandle = userHandle;
    }
}

export default AuthenticatePasskeysResponse;
