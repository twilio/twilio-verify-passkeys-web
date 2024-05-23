type Rp = {
    id: string;
    name: string;
}

type User = {
    id: ArrayBuffer;
    name: string;
    displayName: string;
}

type AuthenticatorSelection = {
    authenticatorAttachment: AuthenticatorAttachment;
    requireResidentKey: boolean;
    residentKey: ResidentKeyRequirement;
    userVerification: UserVerificationRequirement;
}

type CreatePasskeysRequest = {
    challenge: ArrayBuffer;
    rp: Rp;
    user: User;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout: number;
    attestation: AttestationConveyancePreference;
    authenticatorSelection: AuthenticatorSelection;
}