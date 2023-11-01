package com.project.iot.service;

import com.project.iot.entity.Sensor;
import com.project.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {
    @Autowired
    private SensorRepository sensorRepo;

    public List<Sensor> getAllSensors() {
        return sensorRepo.findAll();
    }

    public Sensor createNewSensor(Sensor newSensor) {
        return sensorRepo.save(newSensor);
    }
}
