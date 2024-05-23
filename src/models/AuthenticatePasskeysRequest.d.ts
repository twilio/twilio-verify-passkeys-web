type AuthenticatePasskeyRequestPublicKey = {
    challenge: ArrayBuffer;
    rpId: string; 
    timeout: number;
    allowCredentials: PublicKeyCredentialDescriptor[];
    userVerification: UserVerificationRequirement;
}

type AuthenticatePasskeysRequest = {
    publicKey: AuthenticatePasskeyRequestPublicKey;
}