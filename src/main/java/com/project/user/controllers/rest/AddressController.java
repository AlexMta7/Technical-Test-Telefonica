package com.project.user.controllers.rest;

import com.project.user.dao.AddressDao;
import com.project.user.models.addressModel;
import com.project.user.services.AddressServices;
import com.project.user.utils.JWTUtil;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {

    @Autowired
    private AddressDao addressDao;

    // Actualmente no se está utilizando
    @Autowired
    private AddressServices addressServices;

    @Autowired
    private JWTUtil jwtUtil;

    /*
     * Create
     * Read
     * Update
     * Delete
     */

    // * Create
    // Crea una direccion si el usuario está logueado
    @RequestMapping(value = "api/address", method = RequestMethod.POST)
    public String addAddress(@RequestBody addressModel address, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }

        addressDao.addAddress(address);
        return "OK";
    }

    // * Read
    // Obtiene las direcciones de un usuario específico si el usuario que busca está
    // logueado
    @RequestMapping(value = "api/address/{id}", method = RequestMethod.GET)
    public List<addressModel> getAddress(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return addressDao.getAddress(id);
    }

    // * Update
    // Actualiza los direccions de un usuario con id: x
    @RequestMapping(value = "api/address", method = RequestMethod.PUT)
    public String updateAddress(@RequestBody addressModel address,
            @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }

        addressDao.updateAddress(address);
        return "OK";
    }

    // * Delete
    // Elimina un direccion especifico si el usuario está logueado
    @RequestMapping(value = "api/address/{id}", method = RequestMethod.DELETE)
    public void deleteAddress(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            System.out.println("It's not possible to delete client");
        }
        addressDao.deleteAddress(id);
    }

    // Obtiene todos los direccions
    @RequestMapping(value = "api/address", method = RequestMethod.GET)
    public List<addressModel> getAddresses(@RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return addressDao.getAddresses();
    }

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }

    // * Actualmente no se está utilizando
    // Eliminar por email para que al momento de eliminar un cliente con email x, se
    // elimine todo el direccion/direcione relacionado
    @RequestMapping(value = "api/address/delete/{email}", method = RequestMethod.DELETE)
    public String deleteAddressByEmail(@PathVariable String email) {
        addressServices.deleteByEmail(email);
        return "OK";
    }

}
