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
    public List<clientModel> getClients() {
        String query = "FROM clientModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<clientModel> getClient(Long id) {
        String query = "FROM clientModel WHERE id = :id_user";
        return entityManager.createQuery(query).setParameter("id_user", id).getResultList();
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

    @Override
    public clientModel updateClient(clientModel client) {
        return entityManager.merge(client);
    }

    @Override
    public boolean verifyClient(clientModel client) {
        String query = "FROM clientModel WHERE email = :email";
        List<clientModel> list = entityManager.createQuery(query).setParameter("email", client.getEmail()).getResultList(); 
        return !list.isEmpty();
    }

    // @Override
    // public List<clientModel> getClientsReport() {
    //     String query = "FROM clientModel INTO OUTFILE 'C:/Users/GIS0607/Desktop/Reports/abc.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';";
    //     return entityManager.createQuery(query).getResultList();
    // }


}
