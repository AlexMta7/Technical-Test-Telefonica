package com.project.user.controllers;

import com.project.user.dao.AddressDao;
import com.project.user.models.addressModel;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {
    
    @Autowired
    private AddressDao addressDao;

    @RequestMapping(value = "api/address", method = RequestMethod.GET)
    public List<addressModel> getDocs() {
        return addressDao.getAddresses();
    }

    @RequestMapping(value = "api/address/{email}", method = RequestMethod.GET)
    public List<addressModel> getAddress(@PathVariable String email) {
        return addressDao.getAddress(email);
    }
    
    @RequestMapping(value = "api/address", method = RequestMethod.POST)
    public String addAddress(@RequestBody addressModel address) {
        addressDao.addAddress(address);
        return "OK";
    }

    @RequestMapping(value = "api/address", method = RequestMethod.PUT)
    public String updateAddress(@RequestBody addressModel address) {
        addressDao.updateAddress(address);
        return "OK";
    }
    
    @RequestMapping(value = "api/address/{id}", method = RequestMethod.DELETE)
    public void deleteAddress(@PathVariable Long id){
        addressDao.deleteAddress(id);
    }

    /*Eliminar por email para que al momento de eliminar un cliente con email x, se elimine todo el documento/direcione relacionado*/
    // @RequestMapping(value = "api/address/{email}", method = RequestMethod.DELETE)
    // public void deleteAddressByEmail(@PathVariable String email){
    //     addressDao.deleteAddressByEmail(email);
    // }

}
