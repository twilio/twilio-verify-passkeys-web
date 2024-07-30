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

import TwilioPasskeys from "../TwilioPasskeys";
import CredentialManager from "../CredentialManager";

import { jest } from '@jest/globals';
import { 
    AUTHENTICATOR_ATTACHMENT, 
    AUTHENTICATOR_DATA, 
    CLIENT_DATA_JSON_AUTHENTICATE, 
    ID, 
    RAW_ID, 
    SIGNATURE,
    USER_HANDLE,
    authenticatePasskeyRequest,
    authenticatePayload, 
    authenticateResultPayload 
} from "../utils/PasskeysData";

describe("Testing authenticate method", () => {
    it('Should return success with json payload', async () => {
        jest.spyOn(CredentialManager.prototype, 'getCredential')
            .mockImplementation(
                () => new Promise((resolve) => resolve(authenticateResultPayload))
        )

        const twilioPasskeys = new TwilioPasskeys();
        const authenticatePasskeyResponse = await twilioPasskeys.authenticate(authenticatePayload);
        expect(authenticatePasskeyResponse.Success).toBeDefined();
        expect(authenticatePasskeyResponse.Error).toBeDefined();

        expect(authenticatePasskeyResponse.Error).toBeNull();
        expect(authenticatePasskeyResponse.Success).not.toBeNull();

        expect(authenticatePasskeyResponse.Success?.id).toBe(ID);
        expect(authenticatePasskeyResponse.Success?.rawId).toBe(RAW_ID);
        expect(authenticatePasskeyResponse.Success?.authenticatorAttachment).toBe(AUTHENTICATOR_ATTACHMENT);
        expect(authenticatePasskeyResponse.Success?.authenticatorData).toBe(AUTHENTICATOR_DATA);
        expect(authenticatePasskeyResponse.Success?.clientDataJSON).toBe(CLIENT_DATA_JSON_AUTHENTICATE);
        expect(authenticatePasskeyResponse.Success?.signature).toBe(SIGNATURE);
        expect(authenticatePasskeyResponse.Success?.userHandle).toBe(USER_HANDLE);
    });

    it('Should return success with proper class payload', async () => {
        jest.spyOn(CredentialManager.prototype, 'getCredential')
        .mockImplementation(
            () => new Promise((resolve) => resolve(authenticateResultPayload))
        )

        const twilioPasskeys = new TwilioPasskeys();
        const authenticatePasskeyResponse = await twilioPasskeys.authenticate(authenticatePasskeyRequest);
        expect(authenticatePasskeyResponse.Success).toBeDefined();
        expect(authenticatePasskeyResponse.Error).toBeDefined();

        expect(authenticatePasskeyResponse.Error).toBeNull();
        expect(authenticatePasskeyResponse.Success).not.toBeNull();

        expect(authenticatePasskeyResponse.Success?.id).toBe(ID);
        expect(authenticatePasskeyResponse.Success?.rawId).toBe(RAW_ID);
        expect(authenticatePasskeyResponse.Success?.authenticatorAttachment).toBe(AUTHENTICATOR_ATTACHMENT);
        expect(authenticatePasskeyResponse.Success?.authenticatorData).toBe(AUTHENTICATOR_DATA);
        expect(authenticatePasskeyResponse.Success?.clientDataJSON).toBe(CLIENT_DATA_JSON_AUTHENTICATE);
        expect(authenticatePasskeyResponse.Success?.signature).toBe(SIGNATURE);
        expect(authenticatePasskeyResponse.Success?.userHandle).toBe(USER_HANDLE);
    });

    it('Should return error', async () => {
        jest.spyOn(CredentialManager.prototype, 'getCredential')
            .mockImplementation(
                () => new Promise((_, reject) => reject("Error"))
        )

        const twilioPasskeys = new TwilioPasskeys();
        const authenticatePasskeyResponse = await twilioPasskeys.authenticate(authenticatePayload);
        expect(authenticatePasskeyResponse.Success).toBeDefined()
        expect(authenticatePasskeyResponse.Error).toBeDefined()

        expect(authenticatePasskeyResponse.Error).not.toBeNull()
        expect(authenticatePasskeyResponse.Success).toBeNull()

        expect(authenticatePasskeyResponse.Error).toBe("Error")
    });
})