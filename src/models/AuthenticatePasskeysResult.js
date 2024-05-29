import AuthenticatePasskeysResponse from "./AuthenticatePasskeysResponse";

class AuthenticatePasskeysResult {
    constructor() {
        /**
         * @type {?AuthenticatePasskeysResponse}
         */
        this.Success = null;
        /**
         * @type {unknown}
         */
        this.Error = null;
    }
}

export default AuthenticatePasskeysResult;