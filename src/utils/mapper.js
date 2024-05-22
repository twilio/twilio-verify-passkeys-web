import { ArrayBufferToBase64 } from './converters.js';

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
        challenge: StringToBuffer(challenge),
        rp: rp,
        user: {
            id: StringToBuffer(user.id),
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
 * 
 * @param {Credential} credential
 * @returns {CreatePasskeysResponse}
 */
const mapToPasskeysCreationResponse = (credential) => {
    const { id, rawId, response, type, authenticatorAttachment } = credential;
    const { attestationObject, clientDataJSON } = response;

    return new CreatePasskeysResponse(
        id,
        ArrayBufferToBase64(rawId),
        authenticatorAttachment,
        type,
        ArrayBufferToBase64(attestationObject),
        ArrayBufferToBase64(clientDataJSON),
        ["internal"]
    );
}

/**
 * 
 * @param {string} challengePayload
 * @returns {AuthenticatePasskeysRequest}
 */
const mapToPasskeyAuthenticationPayload = (challengePayload) => {
    const { challenge, rpId, allowCredentials, userVerification } = JSON.parse(challengePayload)
    return {
        publicKey: {
            challenge: Uint8Array.from(atob(challenge), c => c.charCodeAt(0)),
            rpId: rpId,
            timeout: 60000,
            allowCredentials: allowCredentials,
            userVerification: userVerification
        }
    }
}

const mapToPasskeysAuthenticationResponse = (credential) => {
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