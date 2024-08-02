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

/**
 * 
 * @param {ArrayBuffer} buffer 
 * @returns string
 */
const ArrayBufferToBase64 = (buffer) => {
    //@ts-ignore
    const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
    let base64String = btoa(binary);

    base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    return base64String;
}

/**
 * 
 * @param {string} string 
 * @returns {ArrayBuffer}
 */
const StringToArrayBuffer = (string) => {
    const decodedString = atob(string);

    const buffer = new Uint8Array(decodedString.length);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = decodedString.charCodeAt(i);
    }
    return buffer;
}

export {
    ArrayBufferToBase64,
    StringToArrayBuffer
}