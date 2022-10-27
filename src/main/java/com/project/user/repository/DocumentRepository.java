package com.project.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.user.models.documentModel;

@Repository
@Transactional
public interface DocumentRepository extends JpaRepository<documentModel, Long>{

    @Modifying  
    @Query(value = "DELETE FROM documentModel WHERE client_id = :email")
    void deleteDocumentByEmail(@Param("email") String email);
    
}
