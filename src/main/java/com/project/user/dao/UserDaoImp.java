package com.project.user.dao;

import com.project.user.models.userModel;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao{

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<userModel> getUsers() {
        String query = "FROM userModel";
        //List<Usuario> resultado = entityManager.createQuery(query).getResultList();
        //return resultado;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void deleteUsers(Long id) {
        userModel user = entityManager.find(userModel.class,id);
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
        List<userModel> list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();
        return !list.isEmpty();
    }

    @Override
    public List<userModel> getUser(Long id) {
        String query = "FROM userModel WHERE id = :id";
        return entityManager.createQuery(query).setParameter("id", id).getResultList();
    }
}
