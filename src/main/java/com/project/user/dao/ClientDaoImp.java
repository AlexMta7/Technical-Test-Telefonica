package com.project.user.dao;

import com.project.user.models.clientModel;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ClientDaoImp implements ClientDao{
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<ClientDao> getClients() {
        String query = "FROM clientModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void deleteClient(Long id) {
        clientModel client = entityManager.find(clientModel.class, id);
        entityManager.remove(client);
    }

    @Override
    public clientModel addClient(clientModel client) {
        return entityManager.merge(client);
    }
}
