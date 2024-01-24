package com.cs3300group10.sustainablenavigation;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class CalculationController {
    Calculation calcInstance;

    public CalculationController() {
        calcInstance = new Calculation();
    }

    @GetMapping("/info/vehicle_makes")
    public String getVehicleMakes() {
        return calcInstance.getMakes();
    }

    @GetMapping("/info/vehicle_makes/{make}")
    public String getVehicleModels(@PathVariable String make) {
        return calcInstance.getModels(make);
    }

    @GetMapping("/info/emissions/{make}/{model}/{distance}")
    public double getTotalEmissions(@PathVariable String make, @PathVariable String model,
                                    @PathVariable double distance) {
        return calcInstance.getEmissions(model, distance);
    }

    @GetMapping("/info/emissions/other/{transportation}/{distance}")
    public double getTotalEmissions(@PathVariable String transportation, @PathVariable double distance) {
        return calcInstance.getEmissions(distance, transportation);
    }

    @GetMapping("/info/emissions/{make}/{model}/{distance}/{numPassengers}")
    public double getEmissionsPerPerson(@PathVariable String make, @PathVariable String model,
                                        @PathVariable double distance, @PathVariable int numPassengers) {
        return calcInstance.getEmissions(model, distance) / ((double) numPassengers);
    }

    @GetMapping("/info/emissions/other/{transportation}/{distance}/{numPassengers}")
    public double getEmissionsPerPerson(@PathVariable String transportation, @PathVariable double distance,
                                        @PathVariable int numPassengers) {
        return calcInstance.getEmissions(distance, transportation) / ((double) numPassengers);
    }
}
