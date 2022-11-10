package com.project.user.controllers.rest;

import com.project.user.dao.ClientDao;
import com.project.user.models.clientModel;
import com.project.user.utils.JWTUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientDao clientDao;

    @Autowired
    private JWTUtil jwtUtil;

    /*
     * Create
     * Read
     * Update
     * Delete
     */

    // * Create
    // Agrega un cliente si el usuario está logueado
    @RequestMapping(value = "api/clients", method = RequestMethod.POST)
    public String addClient(@RequestBody clientModel client, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }

        if (!clientDao.verifyClient(client)) {
            clientDao.addClient(client);
            return "OK";
        } else {
            return "FAIL";
        }
    }

    // * Read
    // Obtiene a los clientes si el usuario está logueado
    @RequestMapping(value = "api/clients", method = RequestMethod.GET)
    public List<clientModel> getClients(@RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }

        return clientDao.getClients();
    }

    // * Update
    // Actualiza al cliente si el usuario está logueado
    @RequestMapping(value = "api/clients", method = RequestMethod.PUT)
    public String updateClient(@RequestBody clientModel client, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }

        clientDao.updateClient(client);
        return "OK";

        // if(!clientDao.verifyClient(client)) {
        // clientDao.updateClient(client);
        // return "OK";
        // }
        // else {
        // return "FAIL";
        // }
    }

    // * Delete
    // Elimina un cliente si el usuario está logueado
    @RequestMapping(value = "api/clients/{id}", method = RequestMethod.DELETE)
    public void deleteClients(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            System.out.println("It's not possible to delete client");
        } else {
            clientDao.deleteClient(id);
        }
    }

    // Obtiene un solo cliente si el usuario está logueado
    @RequestMapping(value = "api/clients/{id}", method = RequestMethod.GET)
    public List<clientModel> getClient(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return clientDao.getClient(id);
    }

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }
}
