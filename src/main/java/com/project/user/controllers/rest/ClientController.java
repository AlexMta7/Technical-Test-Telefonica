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

    @RequestMapping(value = "api/clients", method = RequestMethod.GET)
    public List<clientModel> getClients(@RequestHeader(value = "Authorization") String token) {

        if(!validateToken(token)){
            return null;
        }

        return clientDao.getClients();
    }
    
    @RequestMapping(value = "api/clients/{id}", method = RequestMethod.GET)
    public List<clientModel> getClient(@PathVariable Long id){
        return clientDao.getClient(id);
    }

    @RequestMapping(value = "api/clients/{id}", method = RequestMethod.DELETE)
    public void deleteClients(@PathVariable Long id){
        clientDao.deleteClient(id);
    }

    @RequestMapping(value = "api/clients", method = RequestMethod.POST)
    public String addClient(@RequestBody clientModel client) {
        if (!clientDao.verifyClient(client)) {
            clientDao.addClient(client);
            return "OK";
        } else {
            return "FAIL";
        }
    }
    
    @RequestMapping(value = "api/clients", method = RequestMethod.PUT)
    public String updateClient(@RequestBody clientModel client) {

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

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }
}
