# Sets up a new environment for the backend
sudo docker pull postgres
sudo docker run --name PostgreSustainableNavigation -p 5455:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sustainablenavigation -d postgres
mkdir src/main/resources/keychain
cd src/main/resources/keychain
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem

# Run Backend
cd ../../../../
mvn clean install
#java -jar target/backend-0.1.0.jar
