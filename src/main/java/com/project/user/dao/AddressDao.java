package com.project.user.dao;

import java.util.List;

import com.project.user.models.addressModel;

public interface AddressDao {

    // Obtiene todas las direcciones
    List<addressModel> getAddresses();

    // Obtiene todas las direcciones de un usuario específico
    List<addressModel> getAddress(Long id);

    addressModel addAddress(addressModel address);

    addressModel updateAddress(addressModel address);

    void deleteAddress(Long id);

}
