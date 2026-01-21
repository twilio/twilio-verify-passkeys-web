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
  /**
   *
   * @param {*} base64Url
   * @returns {Uint8Array}
   */
  function base64UrlToUint8Array(base64Url) {
      const padding = '='.repeat((4 - base64Url.length % 4) % 4);
      const base64 = (base64Url + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
  }

    const { challenge, rpId, allowCredentials, userVerification, timeout } = JSON.parse(challengePayload).publicKey
    if (allowCredentials.length > 0) {
        for (let i = 0; i < allowCredentials.length; i++) {
            allowCredentials[i].id = base64UrlToUint8Array(allowCredentials[i].id);
        }
    }
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
