package com.project.user.dao;

import com.project.user.models.userModel;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

import java.lang.annotation.Native;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<userModel> getUsers() {
        String query = "FROM userModel";
        // List<Usuario> resultado = entityManager.createQuery(query).getResultList();
        // return resultado;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void deleteUsers(Long id) {
        userModel user = entityManager.find(userModel.class, id);
        entityManager.remove(user);
    }

    @Override
    public userModel addUser(userModel user) {
        return entityManager.merge(user);
    }

    @Override
    public userModel updateUser(userModel user) {
        return entityManager.merge(user);
    }

    @Override
    public boolean verifyUser(userModel user) {
        String query = "FROM userModel WHERE email = :email";
        List<userModel> list = entityManager.createQuery(query).setParameter("email", user.getEmail()).getResultList();
        return !list.isEmpty();
    }

    @Override
    public List<userModel> getUser(Long id) {
        String query = "FROM userModel WHERE id = :id";
        return entityManager.createQuery(query).setParameter("id", id).getResultList();
    }

    @Override
    public boolean verifyCredentials(userModel user) {
        String query = "FROM userModel WHERE email = :email";
        List<userModel> list = entityManager.createQuery(query).setParameter("email", user.getEmail()).getResultList();

        if (list.isEmpty()) {
            return false;
        }

        // Gets the password
        String hashedPassword = list.get(0).getPassword();

        // TO VERIFY THE PASSWORD
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        // Compares a Hash with a password. returns a boolean
        if (argon2.verify(hashedPassword, user.getPassword())) {
            return true;
        }

        return false;
    }

    @Override
    public userModel getUserByCredentials(userModel user) {
        String query = "FROM userModel WHERE email = :email";
        List<userModel> list = entityManager.createQuery(query).setParameter("email", user.getEmail()).getResultList();

        if (list.isEmpty()) {
            return null;
        }

        // Gets the password
        String hashedPassword = list.get(0).getPassword();

        // TO VERIFY THE PASSWORD
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        // Compares a Hash with a password. returns a boolean
        if (argon2.verify(hashedPassword, user.getPassword())) {
            return list.get(0);
        }

        return null;
    }

    @Override
    public List<userModel> getUserByEmail(String email) {
        String query = "FROM userModel WHERE email = :email";
        return entityManager.createQuery(query).setParameter("email", email.toString()).getResultList();
    }

    @Override
    public List<userModel> getUserByName(String name) {
        String query = "FROM userModel WHERE name like :name";
        return entityManager.createQuery(query).setParameter("name", name.toString() + '%').getResultList();
    }
}
