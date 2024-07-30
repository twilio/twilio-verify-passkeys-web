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

import { StringToArrayBuffer } from "./converters.js";
import CreatePasskeysResponse from "../models/CreatePasskeysResponse.js";
import AuthenticatePasskeysResponse from "../models/AuthenticatePasskeysResponse.js";

export const RP_ID = "example.com"
export const RP_NAME = "Example"
export const USER_ID = "WUU0ZmQzYWFmNGU0NTMyNGQwZjNlMTM0NjA3YjIxOTEyYg"
export const USER_NAME = "user1"
export const USER_DISPLAY_NAME = "User One"
export const CREATE_CHALLENGE = "WUYwNDhkMWE3ZWMzYTJhNjk3MDA1OWMyNzY2YmJjN2UwZg"
export const PUB_KEY_CRED_TYPE = "public-key"
export const PUB_KEY_CRED_ALG = -7
export const TIMEOUT = 600000
export const KEY_CREDENTIAL = {
    type: PUB_KEY_CRED_TYPE,
    id: "6ySmhJd6qGUMCthiqszyb4Od4U6TFn0v3DLz1EZrNQ",
    transports: ["internal", "hybrid"],
}
export const AUTHENTICATOR_SELECTION_AUTHENTICATOR_ATTACHMENT = "platform"
export const AUTHENTICATOR_SELECTION_REQUIRE_RESIDENT_KEY = false
export const AUTHENTICATOR_SELECTION_RESIDENT_KEY = "preferred"
export const AUTHENTICATOR_SELECTION_USER_VERIFICATION = "preferred"
export const ATTESTATION = "none"

export const createPayload = JSON.stringify({
    rp: {
        id: RP_ID,
        name: RP_NAME,
    },
    user: {
        id: USER_ID,
        name: USER_NAME,
        displayName: USER_DISPLAY_NAME,
    },
    challenge: CREATE_CHALLENGE,
    pubKeyCredParams: [
        {
            type: PUB_KEY_CRED_TYPE,
            alg: PUB_KEY_CRED_ALG,
        },
    ],
    timeout: TIMEOUT,
    excludeCredentials: [
        {
            type: KEY_CREDENTIAL.type,
            id: KEY_CREDENTIAL.id,
            transports: KEY_CREDENTIAL.transports,
        }
    ],
    authenticatorSelection: {
        authenticatorAttachment: AUTHENTICATOR_SELECTION_AUTHENTICATOR_ATTACHMENT,
        requireResidentKey: AUTHENTICATOR_SELECTION_REQUIRE_RESIDENT_KEY,
        residentKey: AUTHENTICATOR_SELECTION_RESIDENT_KEY,
        userVerification: AUTHENTICATOR_SELECTION_USER_VERIFICATION,
    },
    attestation: ATTESTATION,
});

export const ID = "6ySmhJd6qGUMCthiqszyb4Od4U6TFn0v3DLz"
export const RAW_ID = "eb24a684977aa8650c0ad862aaccf26f839de14e93167d2fdc32f3fb5119acd4"
export const AUTHENTICATOR_ATTACHMENT = "platform"
export const ATTESTATION_OBJECT =
  "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViko3mm9u6vuaVeN4wRgDTidR5o" +
    "L6ufLTCrE9ISVYbOGUdFAAAAAAAAAAAAAAAAAAAAAAAAAAAAIOskpoSXeqhlDArYYqrM8m"
export const CLIENT_DATA_JSON_CREATE =
  "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiV1VZd05EaGtNV0UzWldNellUSmhOamsz" +
    "TURBMU9XTXlOelkyWW1Kak4yVXdaZyIsIm9yaWdpbiI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9"
export const TYPE = "public-key"
export const TRANSPORTS = ["internal", "hybrid"]

export const createResultPayload = {
    id: ID,
    rawId: StringToArrayBuffer(RAW_ID),
    authenticatorAttachment: AUTHENTICATOR_ATTACHMENT,
    response: {
        attestationObject: StringToArrayBuffer(ATTESTATION_OBJECT),
        clientDataJSON: StringToArrayBuffer(CLIENT_DATA_JSON_CREATE),
        transports: TRANSPORTS,
    },
    type: TYPE
}

export const createPasskeyResponse = new CreatePasskeysResponse(
    ID,
    RAW_ID,
    AUTHENTICATOR_ATTACHMENT,
    TYPE,
    ATTESTATION_OBJECT,
    CLIENT_DATA_JSON_CREATE,
    TRANSPORTS
);

/**
 * @type {CreatePasskeysRequest}
 */
export const createPasskeyRequest = {
    challenge: StringToArrayBuffer(CREATE_CHALLENGE),
    rp: {
        id: RP_ID,
        name: RP_NAME,
    },
    user: {
        id: StringToArrayBuffer(USER_ID),
        name: USER_NAME,
        displayName: USER_DISPLAY_NAME,
    },
    pubKeyCredParams: [
        {
            type: PUB_KEY_CRED_TYPE,
            alg: PUB_KEY_CRED_ALG,
        },
    ],
    timeout: TIMEOUT,
    attestation: ATTESTATION,
    authenticatorSelection: {
        authenticatorAttachment: AUTHENTICATOR_SELECTION_AUTHENTICATOR_ATTACHMENT,
        requireResidentKey: AUTHENTICATOR_SELECTION_REQUIRE_RESIDENT_KEY,
        residentKey: AUTHENTICATOR_SELECTION_RESIDENT_KEY,
        userVerification: AUTHENTICATOR_SELECTION_USER_VERIFICATION,
    },
}

export const AUTHENTICATE_CHALLENGE = "WUMwNDk4ZWNlYzZhZWYwYWViZjRmNmJkZjBkMTZlOGUyNw"
export const USER_VERIFICATION = "preferred"

export const authenticatePayload = JSON.stringify({
    publicKey: {
        challenge: AUTHENTICATE_CHALLENGE,
        timeout: TIMEOUT,
        rpId: RP_ID,
        allowCredentials: [
            {
                type: KEY_CREDENTIAL.type,
                id: KEY_CREDENTIAL.id,
                transports: KEY_CREDENTIAL.transports,
            }
        ],
        userVerification: USER_VERIFICATION,
    }
});

export const SIGNATURE =
  "MEYCIQDDs662ykELzpmxkQaOR6HY5GwO7nX5z7jc7q9GbWZmvwIhAMEm4VBjWKzn60eGF8VtO6uqkRtSQpJvixCEy9Pr6E4o"
export const USER_HANDLE = "WUU0ZmQzYWFmNGU0NTMyNGQwZjNlMTM0NjA3YjIxOTEyYg"
export const CLIENT_DATA_JSON_AUTHENTICATE =
  "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiV1VNd05EazRaV05sWXpaaFpXWXdZV1ZpWmpSbU5tSmtaakJr" +
    "TVRabE9HVXlOdyIsIm9yaWdpbiI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9"
export const AUTHENTICATOR_DATA = "o3mm9u6vuaVeN4wRgDTidR5oL6ufLTCrE9ISVYbOGUcFAAAAAQ"

export const authenticateResultPayload = {
    id: ID,
    rawId: StringToArrayBuffer(RAW_ID),
    authenticatorAttachment: AUTHENTICATOR_ATTACHMENT,
    type: TYPE,
    response: {
        authenticatorData: StringToArrayBuffer(AUTHENTICATOR_DATA),
        clientDataJSON: StringToArrayBuffer(CLIENT_DATA_JSON_AUTHENTICATE),
        signature: StringToArrayBuffer(SIGNATURE),
        userHandle: StringToArrayBuffer(USER_HANDLE),
    },
}

export const authenticatePasskeyResponse = new AuthenticatePasskeysResponse(
    ID,
    RAW_ID,
    AUTHENTICATOR_ATTACHMENT,
    TYPE,
    CLIENT_DATA_JSON_AUTHENTICATE,
    AUTHENTICATOR_DATA,
    SIGNATURE,
    USER_HANDLE
)

/**
 * @type {AuthenticatePasskeysRequest}
 */
export const authenticatePasskeyRequest = {
    publicKey: {
        challenge: StringToArrayBuffer(AUTHENTICATE_CHALLENGE),
        timeout: TIMEOUT,
        rpId: RP_ID,
        allowCredentials: [{
            type: "public-key",
            id: StringToArrayBuffer(KEY_CREDENTIAL.id),
            transports: ["internal", "hybrid"],
        
        }],
        userVerification: USER_VERIFICATION,
    }
}