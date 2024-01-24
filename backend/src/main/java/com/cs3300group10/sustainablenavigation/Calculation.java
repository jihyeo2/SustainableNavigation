package com.cs3300group10.sustainablenavigation;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.HashMap;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class Calculation {
    //HashMap to easily access make IDS from make name
    HashMap<String, String> makeMap = new HashMap<>();

    //HashMap to easily access model IDs of the established make from the model name
    HashMap<String, String> modelMap = new HashMap<>();

    String API_KEY = "T8XCLk0bAzp4CGhWtGPADQ";

    public Calculation() {}

    /**
     * Calls the Carbon Interface API and returns a list of all available vehicle makes. Also utilizes the HashMap
     * makeMap to store make IDs.
     *
     * @return ArrayList of make names
     */
    public String getMakes() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Content-Type", "application/json");
        ResponseEntity<String> response = restTemplate.exchange(
                "https://www.carboninterface.com/api/v1/vehicle_makes", HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        Gson gson = new Gson();
        JsonObject[] makeList = gson.fromJson(response.getBody(), JsonObject[].class);
        JsonArray makes = new JsonArray();
        if (makeList != null) {
            for (JsonObject i : makeList) {
                String currName = i.get("data").getAsJsonObject().get("attributes").getAsJsonObject().get("name").getAsString();
                makes.add(currName);
                makeMap.put(currName, i.get("data").getAsJsonObject().get("id").getAsString());
            }
            //resets model map to avoid mismatching of models to newly chosen make
            modelMap = new HashMap<>();
            return makes.toString();
        }
        return null;
    }

    /**
     * Calls the Carbon Interface API and returns a list of all available models for a given make. Also utilizes the
     * HashMap modelMap to match model IDs with model names/years.
     *
     * @param make make name of vehicle; ID is acquired through makeMap
     * @return ArrayList of model names for this make
     */
    public String getModels(String make) {
        String makeID = makeMap.get(make);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Content-Type", "application/json");
        ResponseEntity<String> response = restTemplate.exchange(
                "https://www.carboninterface.com/api/v1/vehicle_makes/" + makeID + "/vehicle_models", HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        Gson gson = new Gson();
        JsonObject[] modelList = gson.fromJson(response.getBody(), JsonObject[].class);
        JsonArray models = new JsonArray();
        JsonObject modelJson = new JsonObject();
        if (modelList != null) {
            for (JsonObject i : modelList) {
                String currName = i.get("data").getAsJsonObject().get("attributes").getAsJsonObject().get("name").getAsString();
                int currYear = i.get("data").getAsJsonObject().get("attributes").getAsJsonObject().get("year").getAsInt();
                String newModel = currName + " " + currYear;
                if (models.isEmpty() || !newModel.equals(models.get(models.size() - 1).getAsString())) {
                    models.add(newModel);
                    modelMap.put(newModel, i.get("data").getAsJsonObject().get("id").getAsString());
                }
            }
            modelJson.addProperty("make", make);
            modelJson.add("models", models);
            return modelJson.toString();
        }
        return null;
    }

    /**
     * Using the model and year of the vehicle and the distance of the route, calls Carbon Interface API and receives
     * the CO2 emissions. Uses the model and year to call HashMap "modelMap" and get the model id to pass into the API.
     * This will give us the calculations of emissions from the model of the car and distance traveled.
     * @param model vehicle's model and year
     * @param distance distance in miles of route
     * @return kg of CO2 emissions in kg given the vehicle model and the distance traveled
     */
    public double getEmissions(String model, double distance) {
        String modelID = modelMap.get(model);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Content-Type", "application/json");
        HashMap<String, Object> postBody = new HashMap<>();
        postBody.put("type", "vehicle");
        postBody.put("distance_unit", "mi");
        postBody.put("distance_value", distance);
        postBody.put("vehicle_model_id", modelID);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://www.carboninterface.com/api/v1/estimates", HttpMethod.POST, new HttpEntity<>(postBody, headers), String.class);
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(response.getBody(), JsonObject.class);
        if (jsonObject != null) {
            return (jsonObject.get("data").getAsJsonObject().get("attributes").getAsJsonObject().get("carbon_kg").getAsDouble());
        }
        return 0.0;
    }

    /**
     * Using a rough estimate for average carbon emissions per mile for buses, trains, biking, and walking; the total CO2 emissions
     * for a given distance is calculated and returned.
     * @param distance The number of miles to travel.
     * @param transportation The type transportation used for the travel.
     * @return The total number of carbon emissions.
     */
    public double getEmissions(double distance, String transportation) {
        //sources for CO2 emission values: https://www.carbonfootprint.com/calculator.aspx,
        //https://www.globe.gov/explore-science/scientists-blog/archived-posts/sciblog/index.html_p=186.html
        double emissions_per_mile = 0.0;
        if (transportation.equals("bus")) {
            emissions_per_mile = 0.16439;
        } else if (transportation.equals("train")) {
            //note: the train used in this calculation is a local/commuter train; a long distance train has a smaller CO2 output
            emissions_per_mile = 0.05707;
        } else if (transportation.equals("bike")) {
            emissions_per_mile = 0.0085;
        } else if (transportation.equals("walk")) {
            emissions_per_mile = 0.0195;
        }
        return emissions_per_mile * distance;
    }
}