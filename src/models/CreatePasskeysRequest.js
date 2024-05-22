/**
 * @typedef {Object} Rp
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} User
 * @property {ArrayBuffer} id
 * @property {string} name
 * @property {string} displayName
 */

/**
 * @typedef {Object} PubKeyCredParam
 * @property {string} type
 * @property {number} alg
 */

/** 
 * @typedef {Object} AuthenticatorSelection
 * @property {string} authenticatorAttachment
 * @property {boolean} requireResidentKey
 * @property {string} residentKey
 * @property {string} userVerification
*/


/** 
 * @typedef {Object} CreatePasskeysRequest
 * @property {ArrayBuffer} challenge
 * @property {Rp} rp
 * @property {User} user
 * @property {[]PubKeyCredParam} pubKeyCredParams
 * @property {number} timeout
 * @property {string} attestation
 * @property {AuthenticatorSelection} authenticatorSelection
 */