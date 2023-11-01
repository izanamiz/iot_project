package com.project.iot.controller;

import com.project.iot.entity.Action;
import com.project.iot.service.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/action")
@CrossOrigin
public class ActionController {
    @Autowired
    private ActionService actionService;

    @GetMapping
    public List<Action> getAllActions() {
        return actionService.getAllActions();
    }

    @PostMapping
    public Action createNewBook(@RequestBody Action newAction) {
        return actionService.createNewAction(newAction);
    }


}
