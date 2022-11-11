package com.project.user.dao;

import com.project.user.models.userModel;

import java.util.*;

public interface UserDao {
    List<userModel> getUsers();

    void deleteUsers(Long id);

    userModel addUser(userModel user);

    // Verifica que es usuario exista
    boolean verifyUser(userModel user);

    List<userModel> getUser(Long id);

    userModel updateUser(userModel user);

    // Verifica que las credenciales existan (actualmente no se está utilizando)
    boolean verifyCredentials(userModel user);

    userModel getUserByCredentials(userModel user);

    List<userModel> getUserByEmail(String email);
}
