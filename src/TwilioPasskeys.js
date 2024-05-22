import CredentialManager from './CredentialManager';
import { mapToPasskeysCreationResponse, mapToPasskeysAuthenticationResponse } from './utils/mapper';

/**
 * Class to manage Twilio Passkeys SDKs
 */
class TwilioPasskeys {
    /**
     * Constructor for TwilioPasskeys
     */
    constructor() {
        this.credentialManager = new CredentialManager();
    }

    /**
     * @param {string} challengePayload
     * @returns {Promise<CreatePasskeysResult>}
     */
    async create(challengePayload) {
        let result = new CreatePasskeysResult();
        try {
            let credential = await this.credentialManager.createCredential(challengePayload);
            result.Success = mapToPasskeysCreationResponse(credential);
        } catch (error) {
            result.Error = error;
        }
        return result;
    }

    /**
     * @param {string} challengePayload
     * @returns {Promise<AuthenticatePasskeysResult>}
    */
    async authenticate(challengePayload) {
        let result = new AuthenticatePasskeysResult();
        try {
            let credential = await this.credentialManager.getCredential(challengePayload);
            result.Success = mapToPasskeysAuthenticationResponse(credential);
        } catch (error) {
            result.Error = error;
        }
        return result;
    }
}

export default TwilioPasskeys;