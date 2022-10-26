package com.project.user.dao;

import java.util.List;

import com.project.user.models.addressModel;


public interface AddressDao {

    List<addressModel> getAddresses();

    List<addressModel> getAddress(String email);

    addressModel addAddress(addressModel address);

    addressModel updateAddress(addressModel address);

    void deleteAddress(Long id);

    // void deleteAddressByEmail(String email);
    
}
