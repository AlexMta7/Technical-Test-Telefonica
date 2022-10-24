package com.project.user.dao;

import com.project.user.models.Clientes;
import com.project.user.models.Direcciones;
import com.project.user.models.Documentos;

import java.util.List;

public interface ClienteDao {
    List<Clientes> getClientes();

    void eliminar(Long id);

    List<Clientes> getInfoClientes(Long id);

    void editar(Clientes cliente);

    void registro(Clientes cliente);

    List<Clientes> getInfoCliente(Long id);

    void agregar(Documentos documento);

    void agregarD(Direcciones direcciones);

    List<Documentos> getDocs();

    List<Direcciones> getDir();
}
