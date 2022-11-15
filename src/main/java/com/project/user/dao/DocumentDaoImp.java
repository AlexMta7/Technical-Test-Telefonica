package com.project.user.dao;

import com.project.user.models.documentModel;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Repository
@Transactional
public class DocumentDaoImp implements DocumentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<documentModel> getDocs() {
        String query = "FROM documentModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<documentModel> getDoc(Long id) {
        String query = "FROM documentModel WHERE client_id = :id";
        return entityManager.createQuery(query).setParameter("id", id).getResultList();
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
        documentModel document = entityManager.find(documentModel.class, id);
        entityManager.remove(document);
    }
}
