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