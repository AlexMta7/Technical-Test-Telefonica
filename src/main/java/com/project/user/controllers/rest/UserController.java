package com.project.user.controllers.rest;

import com.project.user.dao.UserDao;
import com.project.user.models.userModel;
import com.project.user.utils.JWTUtil;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    /*
     * Create
     * Read
     * Update
     * Delete
     */

    // * Create
    // Agrega un nuevo usuario con la contraseña encriptada
    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public String addUser(@RequestBody userModel user) {
        if (!userDao.verifyUser(user)) {
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            String hash = argon2.hash(1, 1024, 1, user.getPassword());
            user.setPassword(hash);
            userDao.addUser(user);
            return "OK";
        } else {
            return "FAIL";
        }
    }

    // * Read
    // Obtiene usuarios si existe un token
    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<userModel> getUsers(@RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }
        return userDao.getUsers();
    }

    // * Update
    // Actualiza el registro si el usuario está logueado
    @RequestMapping(value = "api/users", method = RequestMethod.PUT)
    public String updateUser(@RequestBody userModel user, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }
        userDao.updateUser(user);
        return "OK";
    }

    // * Delete
    // Elimina un registro si el usuario está logueado
    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void deleteUsers(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            System.out.println("It's not possible to delete user");
        } else {
            userDao.deleteUsers(id);
        }
    }

    // Obtiene los datos de un usuario
    @RequestMapping(value = "api/users/{id}", method = RequestMethod.GET)
    public List<userModel> getUser(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }

        return userDao.getUser(id);
    }

    // Valida que el token sea el mismo del usuario logeado
    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }

    /*
     * // * Funciona, devuelve la lista
     * // *
     * // * @RequestMapping(value = "api/usuario123", method = RequestMethod.GET)
     * // * public List<userModel> getUsuario(){
     * // * List<userModel> users = new ArrayList<>();
     * // * userModel usuario = new userModel();
     * // * usuario.setId(123L);
     * // * usuario.setName("Alex");
     * // * usuario.setLastname("Mata");
     * // * usuario.setEmail("alexmata@hotmail.com");
     * // * usuario.setPassword("1234567");
     * // * usuario.setType("admin");
     * // *
     * // * userModel usuario2 = new userModel();
     * // * usuario2.setId(123L);
     * // * usuario2.setName("Alex2");
     * // * usuario2.setLastname("Mata2");
     * // * usuario2.setEmail("alexmata2@hotmail.com");
     * // * usuario2.setPassword("12345678");
     * // * usuario2.setType("noAdmin");
     * // *
     * // * users.add(usuario);
     * // * users.add(usuario2);
     * // * return users;
     * // * }
     */

}
