package com.project.user.dao;

import com.project.user.models.userModel;

import java.util.*;

public interface UserDao {
    List<userModel> getUsers();

    void deleteUsers(Long id);

    userModel addUser(userModel user);

    boolean verifyUser(userModel user);

    List<userModel> getUser(Long id);

    userModel updateUser(userModel user);

    boolean verifyCredentials(userModel user);

    userModel getUserByCredentials(userModel user);
}
