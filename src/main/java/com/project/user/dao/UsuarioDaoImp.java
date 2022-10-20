package com.project.user.dao;

import com.project.user.models.Usuarios;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UsuarioDaoImp implements UsuarioDao {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Usuarios> getUsuarios() {
        String query="From Usuarios"; //Hace referencia al modelo Usuarios creado
        List<Usuarios> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }
}
