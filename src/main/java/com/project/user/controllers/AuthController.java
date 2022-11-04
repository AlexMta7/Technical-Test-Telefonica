package com.project.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.user.dao.UserDao;
import com.project.user.models.userModel;
import com.project.user.utils.JWTUtil;

@RestController
public class AuthController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody userModel user){
        //Verifica las credenciales del usuario devolviendo un usuario
        userModel loggedUser = userDao.getUserByCredentials(user);
        if (loggedUser != null){
            String tokenJwt = jwtUtil.create(String.valueOf(loggedUser.getId()), loggedUser.getEmail());
            return tokenJwt;
        }
        return "FAIL";
    }

    // VERIFICACIÓN DE CREDENCIALES SIN JWT
    // @RequestMapping(value = "api/login", method = RequestMethod.POST)
    // public String login(@RequestBody userModel user) {
    //     if (userDao.verifyUser(user)) {
    //         if (userDao.verifyCredentials(user)) {
    //             return "OK";
    //         }
    //         else {
    //             return "FAIL";
    //         }
    //     } 
    //     else {
    //         return "User Doesn't Exist";
    //     }
    // }
}
