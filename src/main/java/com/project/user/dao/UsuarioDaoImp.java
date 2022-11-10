package com.project.user.dao;

import com.project.user.models.Usuarios;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
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

    @Override
    public List<Usuarios> getUserByName(String name) {
        String query = "FROM Usuarios WHERE nom_usu = :name";
        return entityManager.createQuery(query).setParameter("name",name).getResultList();
    }

    //Función para obtener la información del usuario y comparar con la información proporcionada
    //para el inicio de sesión
    @Override
    public Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario) {
        String query = "FROM Usuarios WHERE email_usu = :email";
        List<Usuarios> lista = entityManager.createQuery(query)
                .setParameter("email",usuario.getEmail_usu())
                .getResultList();

        if (lista.isEmpty()){
            return null;
        }

        String passwordHashed = lista.get(0).getPass_usu();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPass_usu())){
            return lista.get(0);
        }

        return null;
    }

    @Override
    public List<Usuarios> getUserByEmail(String email) {
        String query = "FROM Usuarios WHERE email_usu = :email";
        return entityManager.createQuery(query).setParameter("email",email).getResultList();
    }
}