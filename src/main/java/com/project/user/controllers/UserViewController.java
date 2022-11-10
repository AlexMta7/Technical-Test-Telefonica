package com.project.user.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserViewController {

    // @GetMapping("/error")
    // public String error() {
    // return "error";
    // }

    @GetMapping("/users")
    public String user() {
        return "users";
    }

    @GetMapping("/login")
    public String login() {
        return "auth-login-user";
    }

    @GetMapping("/register")
    public String register() {
        return "auth-register-user";
    }
}
