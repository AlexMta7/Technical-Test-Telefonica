package com.project.user.controllers;

import java.util.MissingFormatArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.user.dao.UserDao;
import com.project.user.utils.JWTUtil;

@Controller
public class UserViewController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

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
