package com.project.user.dao;

import com.project.user.models.Clientes;

import java.util.List;

public interface ClienteDao {
    List<Clientes> getClientes();

    void eliminar(Long id);

    List<Clientes> getInfoClientes(Long id);

    void editar(Clientes cliente);

    void registro(Clientes cliente);
}
