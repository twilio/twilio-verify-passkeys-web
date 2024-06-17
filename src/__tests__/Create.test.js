import TwilioPasskeys from "../TwilioPasskeys";
import CredentialManager from "../CredentialManager";
import { 
    createPayload, 
    createResultPayload, 
    ID, 
    RAW_ID,
    AUTHENTICATOR_ATTACHMENT,
    CLIENT_DATA_JSON_CREATE,
    TRANSPORTS,
    createPasskeyRequest
} from "../utils/PasskeysData";
import { jest } from '@jest/globals';

describe("Testing create method", () => {
    const twilioPasskeys = new TwilioPasskeys();

    it('Should return success with json payload', async () => {
        jest.spyOn(CredentialManager.prototype, 'createCredential')
            .mockImplementation(
                () => new Promise((resolve) => resolve(createResultPayload))
        )

        const createPasskeyResponse = await twilioPasskeys.create(createPayload)
        expect(createPasskeyResponse.Success).toBeDefined()
        expect(createPasskeyResponse.Error).toBeDefined()

        expect(createPasskeyResponse.Error).toBeNull()
        expect(createPasskeyResponse.Success).not.toBeNull()

        expect(createPasskeyResponse.Success?.id).toBe(ID)
        expect(createPasskeyResponse.Success?.rawId).toBe(RAW_ID)
        expect(createPasskeyResponse.Success?.authenticatorAttachment).toBe(AUTHENTICATOR_ATTACHMENT)
        expect(createPasskeyResponse.Success?.clientDataJSON).toBe(CLIENT_DATA_JSON_CREATE)
        expect(createPasskeyResponse.Success?.transports).toEqual(TRANSPORTS)
    });

    it('Should return success with proper class payload', async () => {
        jest.spyOn(CredentialManager.prototype, 'createCredential')
            .mockImplementation(
                () => new Promise((resolve) => resolve(createResultPayload))
        )

        const createPasskeyResponse = await twilioPasskeys.create(createPasskeyRequest)
        expect(createPasskeyResponse.Success).toBeDefined()
        expect(createPasskeyResponse.Error).toBeDefined()

        expect(createPasskeyResponse.Error).toBeNull()
        expect(createPasskeyResponse.Success).not.toBeNull()

        expect(createPasskeyResponse.Success?.id).toBe(ID)
        expect(createPasskeyResponse.Success?.rawId).toBe(RAW_ID)
        expect(createPasskeyResponse.Success?.authenticatorAttachment).toBe(AUTHENTICATOR_ATTACHMENT)
        expect(createPasskeyResponse.Success?.clientDataJSON).toBe(CLIENT_DATA_JSON_CREATE)
        expect(createPasskeyResponse.Success?.transports).toEqual(TRANSPORTS)
    })

    it('Should return error', async () => {
        jest.spyOn(CredentialManager.prototype, 'createCredential')
            .mockImplementation(
                () => new Promise((_, reject) => reject("Error"))
        )

        const createPasskeyResponse = await twilioPasskeys.create(createPayload)
        expect(createPasskeyResponse.Success).toBeDefined()
        expect(createPasskeyResponse.Error).toBeDefined()

        expect(createPasskeyResponse.Error).not.toBeNull()
        expect(createPasskeyResponse.Success).toBeNull()

        expect(createPasskeyResponse.Error).toBe("Error")
    });
});