package com.project.user.controllers;

import com.project.user.dao.UserDao;
import com.project.user.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.GET)
    public List<userModel> getUser(@PathVariable Long id) {
        return userDao.getUser(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<userModel> getUsers(){
        return userDao.getUsers();
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void deleteUsers(@PathVariable Long id){
        userDao.deleteUsers(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public String addUser(@RequestBody userModel user) {
        if (!userDao.verifyUser(user)) {
            userDao.addUser(user);
            return "OK";
        } else {
            return "FAIL";
        }
    }

    @RequestMapping(value = "api/users", method = RequestMethod.PUT)
    public String updateUser(@RequestBody userModel user) {
        userDao.updateUser(user);
            return "OK";
        // if (userDao.verifyUser(user)) {
        //     userDao.updateUser(user);
        //     return "OK";
        // } else {
        //     return "FAIL";
        // }
    }


    /*
    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<userModel> getUsers(){
        return UserDao.getUsers();
    }

     */

    /* Funciona, devuelve la lista
    @RequestMapping(value = "api/usuario123", method = RequestMethod.GET)
    public List<userModel> getUsuario(){
        List<userModel> users = new ArrayList<>();
        userModel usuario = new userModel();
        usuario.setId(123L);
        usuario.setName("Alex");
        usuario.setLastname("Mata");
        usuario.setEmail("alexmata@hotmail.com");
        usuario.setPassword("1234567");
        usuario.setType("admin");

        userModel usuario2 = new userModel();
        usuario2.setId(123L);
        usuario2.setName("Alex2");
        usuario2.setLastname("Mata2");
        usuario2.setEmail("alexmata2@hotmail.com");
        usuario2.setPassword("12345678");
        usuario2.setType("noAdmin");

        users.add(usuario);
        users.add(usuario2);
        return users;
    }
     */

}
