package com.project.user.dao;

import com.project.user.models.Clientes;
import com.project.user.models.Logs;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class LogDaoImp implements LogDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void register(Logs logs) {
        entityManager.merge(logs);
    }

    @Override
    public List<Logs> getLogs() {
        String query="From Logs"; //Hace referencia al modelo creado
        List<Logs> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }
}
