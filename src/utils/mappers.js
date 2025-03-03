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

import { ArrayBufferToBase64, StringToArrayBuffer } from './converters.js';
import CreatePasskeysResponse from '../models/CreatePasskeysResponse.js';
import AuthenticatePasskeysResponse from '../models/AuthenticatePasskeysResponse.js';

/** @typedef {import("../models/CreatePasskeysRequest").CreatePasskeysRequest} CreatePasskeysRequest */

/**
 * @param {string} challengePayload
 * @returns {CreatePasskeysRequest}
 */
const mapToPasskeyCreationPayload = (challengePayload) => {
    const { 
        rp, 
        user, 
        pubKeyCredParams, 
        attestation, 
        timeout, 
        challenge, 
        authenticatorSelection 
    } = JSON.parse(challengePayload)

    return {
        challenge: StringToArrayBuffer(challenge),
        rp: rp,
        user: {
            id: StringToArrayBuffer(user.id),
            name: user.name,
            displayName: user.displayName
        },
        pubKeyCredParams: pubKeyCredParams,
        timeout: timeout,
        attestation: attestation,
        authenticatorSelection: authenticatorSelection
    };
}

/**
 * @param {?Credential} credential
 * @returns {CreatePasskeysResponse}
 */
const mapToPasskeysCreationResponse = (credential) => {
    // @ts-ignore
    const { id, rawId, response, type, authenticatorAttachment } = credential;
    const { attestationObject, clientDataJSON } = response;
    const transports = response.getTransports();

    return new CreatePasskeysResponse(
        id,
        ArrayBufferToBase64(rawId),
        authenticatorAttachment,
        type,
        ArrayBufferToBase64(attestationObject),
        ArrayBufferToBase64(clientDataJSON),
        transports
    );
}

/** @typedef {import("../models/AuthenticatePasskeysRequest").AuthenticatePasskeysRequest} AuthenticatePasskeysRequest */

/**
 * 
 * @param {string} challengePayload
 * @returns {AuthenticatePasskeysRequest}
 */
const mapToPasskeyAuthenticationPayload = (challengePayload) => {
    const { challenge, rpId, allowCredentials, userVerification, timeout } = JSON.parse(challengePayload).publicKey
    return {
        publicKey: {
            challenge: Uint8Array.from(atob(challenge), c => c.charCodeAt(0)),
            rpId: rpId,
            timeout: timeout,
            allowCredentials: allowCredentials,
            userVerification: userVerification
        }
    }
}

/**
 * 
 * @param {?Credential} credential 
 * @returns {AuthenticatePasskeysResponse}
 */
const mapToPasskeysAuthenticationResponse = (credential) => {
    // @ts-ignore
    const { id, rawId, response, type, authenticatorAttachment } = credential
    const { authenticatorData, clientDataJSON, signature, userHandle } = response

    return new AuthenticatePasskeysResponse(
        id,
        ArrayBufferToBase64(rawId),
        authenticatorAttachment,
        type,
        ArrayBufferToBase64(clientDataJSON),
        ArrayBufferToBase64(authenticatorData),
        ArrayBufferToBase64(signature),
        ArrayBufferToBase64(userHandle)
    )
}

export { 
    mapToPasskeyCreationPayload, 
    mapToPasskeysCreationResponse, 
    mapToPasskeyAuthenticationPayload,
    mapToPasskeysAuthenticationResponse
};