# CS3300 Fall '23 Sustainable Navigation Project | Backend

### Build Guide
1. Ensure you are in the `root/backend` directory.
2. `mvn clean`
3. `mvn package`
4. Run using `java -jar target/backend-MAJOR.MINOR.PATCH.jar`

NOTE: `MAJOR.MINOR.PATCH` is version number. The version as of `10/04/2023` is `0.1.0`.

### Install Instructions
1. Install Docker
2. Install Java 17 and Maven
3. sudo docker pull postgres
4. sudo docker run --name PostgreSustainableNavigation -p 5455:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sustainablenavigation -d postgres
5. generate public and private key pairs
    
    openssl genrsa -out keypair.pem 2048

    openssl rsa -in keypair.pem -pubout -out public.pem

    openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem

6. Place public.pem and private.pem under backend/src/main/resources/keychain
7. Update application.properties (copy the entire application.template file and modify necessary params)

### Testing 
1. POST /auth/signup. Place a JSON like so into the body and send a request
   {
   "password": "gold",
   "email": "email@gmail.com",
   "firstname": "John",
   "lastname": "Doe"
   }
2. POST /auth/login. Under Postman's auth tab, select basic auth. Use the email as your username.
3. GET /main/test. You should have gotten a JWT token. Try to access /main/test using your JWT as the Bearer Token(under auth). It should give a 401 without auth, but tell you your email with auth.
4. DELETE /auth/delete. Same instructions as login, but not with the endpoints you want to delete.

### Reference Documentation
For further reference, please consider the following sections:
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [GCP Samples](https://github.com/GoogleCloudPlatform/spring-cloud-gcp/tree/main/spring-cloud-gcp-samples)
