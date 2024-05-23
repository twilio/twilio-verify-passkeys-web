import CredentialManager from './CredentialManager';
import { mapToPasskeysCreationResponse, mapToPasskeysAuthenticationResponse, mapToPasskeyCreationPayload, mapToPasskeyAuthenticationPayload } from './utils/mappers';

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
     * @param {string | CreatePasskeysRequest} challengePayload
     * @returns {Promise<CreatePasskeysResult>}
     */
    async create(challengePayload) {
        let result = new CreatePasskeysResult();

        if (typeof(challengePayload) === 'string') {
            challengePayload = mapToPasskeyCreationPayload(challengePayload)
        }

        try {
            let credential = await this.credentialManager.createCredential(challengePayload);
            result.Success = mapToPasskeysCreationResponse(credential);
        } catch (error) {
            result.Error = error;
        }
        return result;
    }

    /**
     * @param {string | AuthenticatePasskeysRequest} challengePayload
     * @returns {Promise<AuthenticatePasskeysResult>}
    */
    async authenticate(challengePayload) {
        let result = new AuthenticatePasskeysResult();
        
        if (typeof(challengePayload) === 'string') {
            challengePayload = mapToPasskeyAuthenticationPayload(challengePayload);
        }

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