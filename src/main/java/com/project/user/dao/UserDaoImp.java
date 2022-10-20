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
}
