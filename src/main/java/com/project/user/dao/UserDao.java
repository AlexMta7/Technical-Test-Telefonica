package com.project.user.dao;

import com.project.user.models.userModel;

import java.util.*;

public interface UserDao {
    List<userModel> getUsers();

    void deleteUsers(Long id);

    userModel addUser(userModel user);
}
