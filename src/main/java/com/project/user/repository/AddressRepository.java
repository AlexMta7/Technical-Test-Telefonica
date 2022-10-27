package com.project.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.user.models.addressModel;


@Transactional
@Repository
public interface AddressRepository extends JpaRepository<addressModel, Long> {
    
    @Modifying  
    @Query(value = "DELETE FROM addresses WHERE add_client_id = :email", nativeQuery = true)
    void deleteAddressByEmail(@Param("email") String email);
}
