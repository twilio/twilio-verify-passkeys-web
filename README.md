# Twilio Verify Passkeys Web

## Table of content

* [About](#about)
* [Documentation](#documentation)
* [Requirements](#requirements)
* [Installation](#installation)
* [Quickstart](#quickstart)
* [Building and Running Sample App](#building-and-running-sample-app)
* [Project Structure](#project-structure)
* [Code Structure](#code-structure)
* [Running Tests](#running-tests)

## About <a name="about"></a>

Twilio Passkeys Web SDK enables developers to easily add Passkeys into their existing authentication flows within their own web applications. The Verify Passkeys SDK supports passkeys creation and authentication using the FIDO/WebAuthn industry standard.

## Documentation <a name="documentation"></a>

[Verify Passkeys Overview](https://www.twilio.com/docs/verify/passkeys)

## Requirements <a name="requirements"></a>

* Node.js v20.x or higher

## Installation <a name="installation"></a>

* Add the library to your project

### Using NPM

```
npm install @twilio/twilio-verify-passkeys-web
```

### Directly from Github

```
npm install https://github.com/twilio/twilio-verify-passkeys-web.git
```

### Using it from CDN

```html
<script src="https://unpkg.com/@twilio/twilio-verify-passkeys-web@0.0.1/dist/twilio-verify-passkeys.iife.js"></script>
```


## Quickstart <a name="quickstart"></a>

### Create registration

Use the `TwilioPasskeys` instance to create a registration by calling the `create(String)` function.

The `create` method receive a param that represent a challenge payload, check how to [create challenge payload](#create-challenge-payload).

You can also call `create(CreatePasskeysRequest)`, where the `CreatePasskeysRequest` is wrapper object of a [creation challenge payload](#create-challenge-payload) schema.

```js
const createPasskeysResult = twilioPasskeys.create(challengePayload)

if(createPasskeysResult.Error !== null) {
    // verify the createPasskeyResult.createPasskeyResponse against your backend and finish sign up
} else {
    // handle error
}
```

### Authenticate a user

Use the `TwilioPasskeys` instance to authenticate a user by calling the `authenticate(String)` function.

The `authenticate` method receive a param that represent an authentication request, it follows the schema of an [authentication challenge payload](#authenticate-challenge-payload).

You can also call `authenticate(AuthenticatePasskeysRequest)`, where the `AuthenticatePasskeysRequest` is a wrapper object of an [authentication challenge payload](#authenticate-challenge-payload).

```js
const authenticatePasskeyResult = twilioPasskeys.authenticate(authenticationRequest)

if(authenticatePasskeyResult.Error !== null) {
    // verify the authenticatePasskeyResult.authenticatePasskeyResponse against your backend
} else {
    // handle error
}
```

### Create Challenge Payload <a name="create-challenge-payload"></a>

The challenge payload for creating a registration is a String obtained by requesting your backend a challenge for registering a user, it uses the JSON schema:

```json
{"rp":{"id":"your_backend","name":"PasskeySample"},"user":{"id":"WUV...5Ng","name":"1234567890","displayName":"1234567890"},"challenge":"WUY...jZQ","pubKeyCredParams":[{"type":"public-key","alg":-7}],"timeout":600000,"excludeCredentials":[],"authenticatorSelection":{"authenticatorAttachment":"platform","requireResidentKey":false,"residentKey":"preferred","userVerification":"preferred"},"attestation":"none"}
```

### Authenticate Challenge Payload <a name="authenticate-challenge-payload"></a>

The challenge payload for authenticating a user is a JSON with the schema:

```json
{"publicKey":{"challenge":"WUM...2Mw","timeout":300000,"rpId":"your_backend","allowCredentials":[],"userVerification":"preferred"}}
```

## Building and Running Sample App <a name="building-and-running-sample-app"></a>

### Requirements

* ngrok

### Steps

1. Clone this repository.
2. Install the dependencies using 
```
npm install
```
3. Make sure you have setup your [backend](#backend-side-configurations-for-sample-app) 
4. Go to the `config.js` file inside the `sample-app` folder and replace the backend url with your backend url
3. Run the following command to build and run a local server with the sample app
```
npm run demo
```
4. The previous step will open a browser tap with the localhost server running at port `8080`, run ngrok for that port:
```
ngrok http http://localhost:8080
```
5. Open the sample app in your browser using the url that ngrok provides: `https://example.ngrok.app/sample-app/`

### Backend side configurations for sample app <a name="backend-side-configurations-for-sample-app"></a>

1. Setup a backend throught the function template of [passkeys-backend](https://github.com/twilio-labs/function-templates/tree/main/passkeys-backend)

2. Make sure you already added support for digital asset links, this should be inside a file called `assetlinks.json` in your backend, check whether an entry with the following structure:
```json
{
    "relation":[
        "delegate_permission/common.get_login_creds",
        "delegate_permission/common.handle_all_urls"
    ],
    "target":{
        "namespace": "web",
        "site": "https://example.ngrok.app"
    }
},
```
3. Add the ngrok url to the enviroment variables in the field `RP_DOMAIN` if you are using just this sample app.
```
RP_DOMAIN=example.ngrok.app
```

4. Add the ngrok url to the enviroment variable called `ORIGINS`, using a full url format.

```
ORIGINS=https://example.ngrok.app
```

## Project Structure <a name="project-structure"></a>

* `src`: Contains all the main code, including business logic, data models, and utility functions.
* `sample-app`: This folder contains a simple demo application code that use html and vanilla javascript.

## Code Structure <a name="code-structure"></a>

### Main code

The `src` folder constains all the core code. This includes:

* Data models (`src/models`)
* Buisness logic (`src/TwilioPasskeys.js`)
* Utility functions (`src/utils`)

### Sample App

The `sample-app` folder contains a simple demo app code. This includes:

* Vanilla javascript code that works as code snippets for integrating with the Twilio Verify Passkeys SDK

* HTML code that works as UI implementation

## Running Tests <a name="running-tests"></a>

### Running all tests

```
npm run test
```

### Running test coverage

```
npm run coverage
```