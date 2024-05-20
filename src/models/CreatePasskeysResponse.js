class CreatePasskeysResponse {
    /**
     * @param {string} id 
     * @param {string} rawId 
     * @param {string} authenticatorAttachment 
     * @param {string} type 
     * @param {string} attestationObject 
     * @param {string} clientDataJSON 
     * @param {string[]} transports 
     */
    constructor(id, rawId, authenticatorAttachment, type, attestationObject, clientDataJSON, transports) {
        this.id = id;
        this.rawId = rawId;
        this.authenticatorAttachment = authenticatorAttachment;
        this.type = type;
        this.attestationObject = attestationObject;
        this.clientDataJSON = clientDataJSON;
        this.transports = transports;
    }
}