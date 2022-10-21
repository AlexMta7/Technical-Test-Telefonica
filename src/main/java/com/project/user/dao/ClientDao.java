package com.project.user.dao;

import com.project.user.models.clientModel;

import java.util.List;

public interface ClientDao {
    List<ClientDao> getClients();

    void deleteClient(Long id);

    clientModel addClient(clientModel client);
}
