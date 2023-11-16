package com.project.iot.controller;

import com.project.iot.entity.Action;
import com.project.iot.entity.Sensor;
import com.project.iot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/sensor")
@CrossOrigin
public class SensorController {
    @Autowired
    private SensorService sensorService;

    @GetMapping
    public List<Sensor> getAllSensors() {
        return sensorService.getAllSensors();
    }

    @PostMapping
    public Sensor createNewSensor(@RequestBody Sensor newSensor) {
        return sensorService.createNewSensor(newSensor);
    }
}
