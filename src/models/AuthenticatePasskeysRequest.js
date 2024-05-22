/**
 * @typedef {Object} AuthenticatePasskeyRequestPublicKey
 * @property {Uint8Array} challenge
 * @property {string} rpId
 * @property {number} timeout
 * @property {Array<PublicKeyCredentialDescriptor>} allowCredentials
 * @property {UserVerificationRequirement} userVerification
 */

/**
 * @typedef {Object} AuthenticatePasskeysRequest
 * @property {AuthenticatePasskeyRequestPublicKey} publicKey
 */