package com.project.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.user.repository.AddressRepository;

@Service
public class AddressServices {
    @Autowired
    AddressRepository addressRepository;

    public String deleteByEmail(String email) {
        addressRepository.deleteAddressByEmail(email);
        return "Ok";
    }
}
