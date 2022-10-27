package com.project.user.dao;

import com.project.user.models.documentModel;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Repository
@Transactional
public class DocumentDaoImp implements DocumentDao{

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<documentModel> getDocs() {
        String query = "FROM documentModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<documentModel> getDoc(String email) {
        String query = "FROM documentModel WHERE client_id = :email";
        return entityManager.createQuery(query).setParameter("email",email).getResultList();
    }

    @Override
    public documentModel addDocs(documentModel document) {
        return entityManager.merge(document);
    }

    @Override
    public documentModel updateDocs(documentModel document) {
        return entityManager.merge(document);
    }

    @Override
    public void deleteDoc(Long id) {
        documentModel document = entityManager.find(documentModel.class,id);
        entityManager.remove(document);
    }

    

    
}
