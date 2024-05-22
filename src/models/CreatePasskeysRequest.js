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
 * @typedef {Object} AuthenticatorSelection
 * @property {AuthenticatorAttachment} authenticatorAttachment
 * @property {boolean} requireResidentKey
 * @property {ResidentKeyRequirement} residentKey
 * @property {UserVerificationRequirement} userVerification
*/


/** 
 * @typedef {Object} CreatePasskeysRequest
 * @property {ArrayBuffer} challenge
 * @property {Rp} rp
 * @property {User} user
 * @property {Array<PublicKeyCredentialParameters>} pubKeyCredParams
 * @property {number} timeout
 * @property {AttestationConveyancePreference} attestation
 * @property {AuthenticatorSelection} authenticatorSelection
 */