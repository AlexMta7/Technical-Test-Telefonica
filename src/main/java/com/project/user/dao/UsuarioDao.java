package com.project.user.dao;

import com.project.user.models.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface UsuarioDao {
    List<Usuarios> getUsuarios();

    List<Usuarios> getInfoUsuarios(Long id);

    void editar(Usuarios usuario);

    void eliminar(Long id);

    void registro(Usuarios usuario);

    List<Usuarios> getUserByName(String name);

    Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario);

    List<Usuarios> getUserByEmail(String email);
}
