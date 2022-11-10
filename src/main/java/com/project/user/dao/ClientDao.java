package com.project.user.dao;

import com.project.user.models.clientModel;

import java.util.List;

public interface ClientDao {
    List<clientModel> getClients();

    void deleteClient(Long id);

    clientModel addClient(clientModel client);

    // Verifica si el cliente ya existe (email)
    boolean verifyClient(clientModel client);

    clientModel updateClient(clientModel client);

    List<clientModel> getClient(Long id);
}
