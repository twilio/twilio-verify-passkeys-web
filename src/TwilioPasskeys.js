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
}

export default TwilioPasskeys;