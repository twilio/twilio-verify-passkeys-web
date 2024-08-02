/**
 * @jest-environment jsdom
 */

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
import TwilioPasskeys from "../../TwilioPasskeys";
import CredentialManager from "../../CredentialManager";

import { 
    createPayload, 
    createResultPayload, 
    createPasskeyRequest,
    authenticateResultPayload,
    authenticatePayload,
    authenticatePasskeyRequest
} from "../../utils/PasskeysData";

import { jest } from '@jest/globals';

describe("Testing Behavior of class", () => {
    Object.assign(navigator, {
        credentials: {
            create: () => new Promise((resolve) => resolve(createResultPayload)),
            get: () => new Promise((resolve) => resolve(authenticateResultPayload))
        }
    });

    const navigatorCreate = jest.spyOn(navigator.credentials, 'create');
    const navigatorGet = jest.spyOn(navigator.credentials, 'get');

    const twilioPasskeys = new TwilioPasskeys();

    it("Should contain required methods", () => {
        expect(twilioPasskeys).toBeInstanceOf(TwilioPasskeys);
        expect(twilioPasskeys.credentialManager).toBeInstanceOf(CredentialManager);

        expect(twilioPasskeys.create).toBeDefined();
        expect(twilioPasskeys.authenticate).toBeDefined();
    });

    it("Should return same values for create in with both payloads", async () => {
        const createPasskeyResponseJson = await twilioPasskeys.create(createPayload)
        const createPasskeyResponseClass = await twilioPasskeys.create(createPasskeyRequest)

        expect(navigatorCreate).toHaveBeenCalledTimes(2);

        expect(createPasskeyResponseJson.Success).toBeDefined()
        expect(createPasskeyResponseClass.Success).toBeDefined()

        expect(createPasskeyResponseJson.Success).not.toBeNull()
        expect(createPasskeyResponseClass.Success).not.toBeNull()

        expect(createPasskeyResponseJson.Success).toEqual(createPasskeyResponseClass.Success);
    });

    it("Should return same values for authenticate in with both payloads", async () => {
        const authenticatePasskeyResponseJson = await twilioPasskeys.authenticate(authenticatePayload)
        const authenticatePasskeyResponseClass = await twilioPasskeys.authenticate(authenticatePasskeyRequest)

        expect(navigatorGet).toHaveBeenCalledTimes(2);

        expect(authenticatePasskeyResponseJson.Success).toBeDefined()
        expect(authenticatePasskeyResponseClass.Success).toBeDefined()

        expect(authenticatePasskeyResponseJson.Success).not.toBeNull()
        expect(authenticatePasskeyResponseClass.Success).not.toBeNull()

        expect(authenticatePasskeyResponseJson.Success).toEqual(authenticatePasskeyResponseClass.Success);
    });
});