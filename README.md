# Private BlockChain Notary Service"

Web service for a simple private Blockchain implemented using `Node.js` and `Express` framework  -- project @ Udacity's Blockchain Developer Nanodegree

Follow this step below to deployment and test this project.


![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/shutterstock_749922058.jpg)

# Get started

1) Download project

```
$ git clone https://github.com/wleandrooliveira/private_blockchain_notary_service.git
```
2) Install dependencies

```
$ cd private_blockchain_notary_service
$ npm install
```
3) Run application

```
$ node server.js
when run node server.js by first time.
```

# API Endpoint 

In this this project i used postman to make a test request.
[Postman](https://www.getpostman.com) is a powerful tool used to test web services. It was developed for sending HTTP requests in a simple and quick way.

Example:
```
http://localhost:8000/block/0
```
## Test Endpoints

## Request Validation - initiates a request for validation

**Method**: POST

**URL**: ```http://localhost:8000/requestValidation```

**Required Parameters**: ```{ "address:" "bc1qm0kfc574vg4zk5wc5yuae3r9whpm6dd7w4vxxr" } ```


![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/requestValidadtion.PNG)


**Method**: POST

**URL**: ```http://localhost:8000/message-signature/validate```

# Sign Message by Electrum

![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/signatureElectrum.PNG)

**Required Parameters**:
```
{
	"address":"bc1qm0kfc574vg4zk5wc5yuae3r9whpm6dd7w4vxxr",
	"signature":"IDm1YeogK5p3s3KHjbiyZTHJGK8x66unrD1UyuHa8kntBChN6DhUZbLfYyYIsfEiSjtroLhY1K/syL7FdgTmzUw="
}
```


![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/message_signature.PNG)

## Register Star - registers a new star in the blockchain containing specified data

**Method**: POST

**URL**: ```http://localhost:8000/block```

**Required Parameters**:
```
{
  "address": "bc1qm0kfc574vg4zk5wc5yuae3r9whpm6dd7w4vxxr",
  "star": {
    "dec": "-26° 29' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
}

```
![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/createBlock.PNG)


# License

Copyright (c) 2019 Wanderson Leandro de Oliveira
