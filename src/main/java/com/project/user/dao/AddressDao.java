package com.project.user.dao;

import java.util.List;

import com.project.user.models.addressModel;


public interface AddressDao {

    List<addressModel> getAddresses();

    List<addressModel> getAddress(Long id);

    addressModel addAddress(addressModel address);

    addressModel updateAddress(addressModel address);

    void deleteAddress(Long id);
    
}
