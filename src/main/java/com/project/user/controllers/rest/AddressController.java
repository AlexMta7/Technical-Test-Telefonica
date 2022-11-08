package com.project.user.controllers.rest;

import com.project.user.dao.AddressDao;
import com.project.user.models.addressModel;
import com.project.user.services.AddressServices;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {
    
    @Autowired
    private AddressDao addressDao;

    @Autowired
    private AddressServices addressServices;

    @RequestMapping(value = "api/address", method = RequestMethod.GET)
    public List<addressModel> getDocs() {
        return addressDao.getAddresses();
    }

    @RequestMapping(value = "api/address/{id}", method = RequestMethod.GET)
    public List<addressModel> getAddress(@PathVariable Long id) {
        return addressDao.getAddress(id);
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
    public void deleteAddress(@PathVariable Long id) {
        addressDao.deleteAddress(id);
    }
    

    /*Eliminar por email para que al momento de eliminar un cliente con email x, se elimine todo el documento/direcione relacionado*/
    @RequestMapping(value = "api/address/delete/{email}", method = RequestMethod.DELETE)
    public String deleteAddressByEmail(@PathVariable String email){
        addressServices.deleteByEmail(email);
        return "OK";
    }

}
