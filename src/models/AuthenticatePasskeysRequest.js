/**
 * @typedef {Object} KeyCredential
 * @property {string} id
 * @property {string} type
 * @property {[]string} transports
 */

/**
 * @typedef {Object} AuthenticatePasskeyRequestPublicKey
 * @property {string} challenge
 * @property {string} rpId
 * @property {number} timeout
 * @property {[]KeyCredential} allowCredentials
 * @property {string} userVerification
 */

/**
 * @typedef {Object} AuthenticatePasskeysRequest
 * @property {AuthenticatePasskeyRequestPublicKey} publicKey
 */