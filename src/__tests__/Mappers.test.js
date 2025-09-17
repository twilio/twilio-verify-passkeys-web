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

import {
    mapToPasskeyCreationPayload,
    mapToPasskeysCreationResponse,
    mapToPasskeyAuthenticationPayload,
    mapToPasskeysAuthenticationResponse
} from '../utils/mappers';

import {
    createPayload,
    createPasskeyRequest,
    createResultPayload,
    createPasskeyResponse,
    authenticatePayload,
    authenticatePasskeyRequest,
    authenticateResultPayload,
    authenticatePasskeyResponse
} from '../utils/PasskeysData';

describe("Testing mappers", () => {
    it('Should map to passkey creation payload', () => {
        const passkeyCreationPayload = mapToPasskeyCreationPayload(createPayload)
        expect(passkeyCreationPayload.challenge).toEqual(createPasskeyRequest.challenge)
        expect(passkeyCreationPayload.rp).toEqual(createPasskeyRequest.rp)
        expect(passkeyCreationPayload.user).toEqual(createPasskeyRequest.user)
        expect(passkeyCreationPayload.pubKeyCredParams).toEqual(createPasskeyRequest.pubKeyCredParams)
        expect(passkeyCreationPayload.timeout).toEqual(createPasskeyRequest.timeout)
        expect(passkeyCreationPayload.attestation).toEqual(createPasskeyRequest.attestation)
        expect(passkeyCreationPayload.authenticatorSelection).toEqual(createPasskeyRequest.authenticatorSelection)
    });

    it('Should map to passkey creation response', () => {
        const passkeyCreationResponse = mapToPasskeysCreationResponse(createResultPayload)
        expect(passkeyCreationResponse.id).toEqual(createPasskeyResponse.id)
        expect(passkeyCreationResponse.rawId).toEqual(createPasskeyResponse.rawId)
        expect(passkeyCreationResponse.authenticatorAttachment).toEqual(createPasskeyResponse.authenticatorAttachment)
        expect(passkeyCreationResponse.type).toEqual(createPasskeyResponse.type)
        expect(passkeyCreationResponse.clientDataJSON).toEqual(createPasskeyResponse.clientDataJSON)
        expect(passkeyCreationResponse.transports).toEqual(createPasskeyResponse.transports)
    });

    it('Should map to passkey authentication payload', () => {
        const passkeyAuthenticationPayload = mapToPasskeyAuthenticationPayload(authenticatePayload)
        expect(passkeyAuthenticationPayload.publicKey.challenge).toEqual(authenticatePasskeyRequest.publicKey.challenge)
        expect(passkeyAuthenticationPayload.publicKey.timeout).toEqual(authenticatePasskeyRequest.publicKey.timeout)
        expect(passkeyAuthenticationPayload.publicKey.rpId).toEqual(authenticatePasskeyRequest.publicKey.rpId)
        expect(passkeyAuthenticationPayload.publicKey.userVerification).toEqual(authenticatePasskeyRequest.publicKey.userVerification)
    });

    it('Should map to passkey authentication response', () => {
        const passkeyAuthenticationResponse = mapToPasskeysAuthenticationResponse(authenticateResultPayload)
        expect(passkeyAuthenticationResponse.id).toEqual(authenticatePasskeyResponse.id)
        expect(passkeyAuthenticationResponse.rawId).toEqual(authenticatePasskeyResponse.rawId)
        expect(passkeyAuthenticationResponse.authenticatorAttachment).toEqual(authenticatePasskeyResponse.authenticatorAttachment)
        expect(passkeyAuthenticationResponse.type).toEqual(authenticatePasskeyResponse.type)
        expect(passkeyAuthenticationResponse.clientDataJSON).toEqual(authenticatePasskeyResponse.clientDataJSON)
    });
});
