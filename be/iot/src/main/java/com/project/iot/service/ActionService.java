package com.project.iot.service;

import com.project.iot.entity.Action;
import com.project.iot.repository.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {
    @Autowired
    private ActionRepository actionRepo;

    public List<Action> getAllActions() {
        return actionRepo.findAll();
    }

    public Action createNewAction(Action newAction) {
        return actionRepo.save(newAction);
    }
}
