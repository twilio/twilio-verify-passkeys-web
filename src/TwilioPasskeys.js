import CredentialManager from './CredentialManager';

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
    create(challengePayload) {}

    /**
     * @param {string} challengePayload
     * @returns {Promise<AuthenticatePasskeysResult>}
    */
    authenticate(challengePayload) {}
}

export default TwilioPasskeys;