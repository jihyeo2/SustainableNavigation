# CS3300 Fall '23 Sustainable Navigation Project

## Tools
- Java JDK/JRE == 17
- Maven >= 3.9.4
- Node >= 20.6.1
- npm >= 9.8.1
- PostreSQL == 15.4.1

## Run Guide
### Backend
1. Ensure you are in the `root/backend` directory.
2. `mvn clean`
3. `mvn package`
4. Run using `java -jar target/backend-MAJOR.MINOR.PATCH.jar`

NOTE: `MAJOR.MINOR.PATCH` is version number. The version as of `10/04/2023` is `0.1.0`.

### Frontend
1. Ensure you are in the `root/frontend` directory.
2. `npm install`
3. `npm run dev`
4. Navigate to `localhost:3000` in your browser.