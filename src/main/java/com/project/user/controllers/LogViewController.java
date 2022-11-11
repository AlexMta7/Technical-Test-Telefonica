package com.project.user.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogViewController {

    @GetMapping("/logs")
    public String clients() {
        return "logs";
    }
}
