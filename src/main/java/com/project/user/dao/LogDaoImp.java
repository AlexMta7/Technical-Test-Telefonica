package com.project.user.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.project.user.models.documentModel;
import com.project.user.models.logModel;

@Repository
@Transactional
public class LogDaoImp implements LogDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public logModel addLog(logModel log) {
        return entityManager.merge(log);
    }

    @Override
    public List<documentModel> getLogs() {
        String query = "FROM logModel";
        return entityManager.createQuery(query).getResultList();
    }

}
