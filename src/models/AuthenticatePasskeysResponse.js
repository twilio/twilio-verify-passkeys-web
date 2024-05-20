class AuthenticatePasskeysResponse {
    /**
     * 
     * @param {string} id 
     * @param {string} rawId 
     * @param {string} authenticatorAttachment 
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