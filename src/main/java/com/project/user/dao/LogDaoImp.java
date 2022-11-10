package com.project.user.dao;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class LogDaoImp implements LogDao{

    @PersistenceContext
    EntityManager entityManager;
}
