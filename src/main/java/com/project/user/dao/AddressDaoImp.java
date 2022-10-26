package com.project.user.dao;

import com.project.user.models.addressModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class AddressDaoImp implements AddressDao {
    
    @PersistenceContext
    private EntityManager entityManager;
    private JpaRepository jpaRepository;

    @Override
    public List<addressModel> getAddresses() {
        String query = "FROM addressModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<addressModel> getAddress(String email) {
        String query = "FROM addressModel WHERE client_id = :email";
        return entityManager.createQuery(query).setParameter("email",email).getResultList();
    }

    @Override
    public addressModel addAddress(addressModel address) {
        return entityManager.merge(address);
    }

    @Override
    public addressModel updateAddress(addressModel address) {
        return entityManager.merge(address);
    }

    @Override
    public void deleteAddress(Long id) {
        addressModel address = entityManager.find(addressModel.class, id);
        entityManager.remove(address);
    }

    // @Override
    // public String deleteAddressByEmail(String email) {
    //     addressModel address = entityManager.find(addressModel.class, email);
    //     entityManager.remove(address);
    //     return "Oki";
    // }

    @Override
    public String deleteAddressByEmail(String email) {
        String query = "DELETE FROM addressModel WHERE client_id = :email";
        entityManager.createQuery(query).setParameter("email", email);
        return "Oki";
    }
    
}
