package com.project.user.controllers;

import com.project.user.dao.ClienteDao;
import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios")
    public List<Usuarios> getUsuarios(){

        return usuarioDao.getUsuarios();
    }
}
