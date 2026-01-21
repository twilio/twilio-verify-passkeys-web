/*
 * Copyright © 2025 Twilio Inc.
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

import CredentialManager from "../CredentialManager";
import { jest } from '@jest/globals';

 describe('PasskeyService - isPasskeysSupported', () => {
   let credentialManager;
   const originalPublicKeyCredential = window.PublicKeyCredential;

   beforeEach(() => {
     credentialManager = new CredentialManager();
     jest.clearAllMocks();
   });

   afterEach(() => {
     Object.defineProperty(window, 'PublicKeyCredential', {
       writable: true,
       value: originalPublicKeyCredential,
     });
   });

   it('Should return false if window.PublicKeyCredential is not defined', async () => {
     Object.defineProperty(window, 'PublicKeyCredential', {
       writable: true,
       value: undefined,
     });

     const result = await credentialManager.isPasskeysSupported();

     expect(result).toEqual({
       supportWebAuthn: false,
       supportPlatformAuth: false,
       supportConditionalUI: false,
     });
   });

   it('Should return supportWebAuthn true, but everything else false if hardware is not supported', async () => {
     const mockIsUserVerifying = jest.fn().mockResolvedValue(false);
     const mockIsConditional = jest.fn().mockResolvedValue(false);

     Object.defineProperty(window, 'PublicKeyCredential', {
       writable: true,
       value: {
         isUserVerifyingPlatformAuthenticatorAvailable: mockIsUserVerifying,
         isConditionalMediationAvailable: mockIsConditional,
       },
     });

     const result = await credentialManager.isPasskeysSupported();

     expect(mockIsUserVerifying).toHaveBeenCalled();
     expect(result).toEqual({
       supportWebAuthn: true,
       supportPlatformAuth: false,
       supportConditionalUI: false,
     });
   });

   it('Should return true if browser and hardware support passkeys', async () => {
     const mockIsUserVerifying = jest.fn().mockResolvedValue(true);
     const mockIsConditional = jest.fn().mockResolvedValue(true);

     Object.defineProperty(window, 'PublicKeyCredential', {
       writable: true,
       value: {
         isUserVerifyingPlatformAuthenticatorAvailable: mockIsUserVerifying,
         isConditionalMediationAvailable: mockIsConditional,
       },
     });

     const result = await credentialManager.isPasskeysSupported();

     expect(result).toEqual({
       supportWebAuthn: true,
       supportPlatformAuth: true,
       supportConditionalUI: true,
     });
   });

   it('should manage cases when isConditionalMediationAvailable is not a function (old browsers)', async () => {
     const mockIsUserVerifying = jest.fn().mockResolvedValue(true);

     Object.defineProperty(window, 'PublicKeyCredential', {
       writable: true,
       value: {
         isUserVerifyingPlatformAuthenticatorAvailable: mockIsUserVerifying,
       },
     });

     const result = await credentialManager.isPasskeysSupported();

     expect(result).toEqual({
       supportWebAuthn: true,
       supportPlatformAuth: true,
       supportConditionalUI: false,
     });
   });
 });
