package com.project.user.controllers;

import com.project.user.dao.UserDao;
import com.project.user.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserDao userDao;

    /*
    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<userModel> getUsers(){
        return UserDao.getUsers();
    }

     */

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public userModel getUsuario(){
        userModel usuario = new userModel();
        usuario.setId(123L);
        usuario.setName("Alex");
        usuario.setLastname("Mata");
        usuario.setEmail("alexmata@hotmail.com");
        usuario.setPassword("1234567");
        usuario.setType("admin");
        return usuario;
    }

}
