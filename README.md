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

**Required Parameters**:
```
{
	"address":"bc1qm0kfc574vg4zk5wc5yuae3r9whpm6dd7w4vxxr",
	"signature":"IDm1YeogK5p3s3KHjbiyZTHJGK8x66unrD1UyuHa8kntBChN6DhUZbLfYyYIsfEiSjtroLhY1K/syL7FdgTmzUw="
}
```
# Sign Message by Electrum


![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/signatureElectrum.PNG)

![Alt text](https://github.com/wleandrooliveira/private_blockchain_notary_service/blob/master/src/images/message_signature.PNG)



Example:
```
http://localhost:8000/block/11
```

![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/404_by_id.PNG)


## Add Block

Add a new block with string data to the Blockchain

**Method**: POST

**URL**: `/block`

**Data**:
* key: body
* value: string

Example:
```
http://localhost:8000/block
```
![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/insertBlock.PNG)


# License

Copyright (c) 2019 Wanderson Leandro de Oliveira
