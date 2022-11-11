package com.project.user.controllers;

import com.project.user.dao.LogDao;
import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Logs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
@RestController
public class LogController {
    @Autowired
    private LogDao logDao;

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/logs", method = RequestMethod.POST)
    public void registerLog(@RequestBody Logs logs){
        logDao.register(logs);
    }

    @RequestMapping(value = "api/logs", method = RequestMethod.GET)
    public List<Logs> getLogs(){
        return logDao.getLogs();
    }
}
