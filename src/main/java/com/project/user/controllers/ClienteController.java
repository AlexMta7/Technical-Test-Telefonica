package com.project.user.controllers;

import com.project.user.dao.ClienteDao;
import com.project.user.models.Clientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClienteController {
    @Autowired
    private ClienteDao clienteDao;

    @RequestMapping(value = "api/clientes")
    public List<Clientes> getClientes(){

        return clienteDao.getClientes();
    }
}
