/*
 * Copyright © 2024 Twilio Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

export type CreatePasskeysRequest = {
    challenge: ArrayBuffer;
    rp: Rp;
    user: User;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout: number;
    attestation: AttestationConveyancePreference;
    authenticatorSelection: AuthenticatorSelection;
}