package com.project.user.dao;

import com.project.user.models.Usuarios;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Usuarios> getUsuarios() {
        String query="From Usuarios"; //Hace referencia al modelo creado
        List<Usuarios> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public List<Usuarios> getInfoUsuarios(Long id) {
        String query="From Usuarios WHERE id_usu = " + id ;
        List<Usuarios> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void editar(Usuarios usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public void eliminar(Long id) {
        Usuarios usuarios = entityManager.find(Usuarios.class,id);
        entityManager.remove(usuarios);
    }

    @Override
    public void registro(Usuarios usuario) {
        entityManager.merge(usuario);
    }
}
