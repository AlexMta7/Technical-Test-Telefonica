package com.project.user.controllers;

import com.project.user.dao.LogDao;
import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Logs;
import com.project.user.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
public class LogController {
    @Autowired
    private LogDao logDao;

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token){

        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/logs", method = RequestMethod.POST)
    public void registerLog(@RequestHeader(value = "Authorization") String token, @RequestBody Logs logs){
        if (!validarToken(token)){
            return;
        }

        logDao.register(logs);
    }

    @RequestMapping(value = "api/logs", method = RequestMethod.GET)
    public List<Logs> getLogs(@RequestHeader(value = "Authorization") String token){
        if (!validarToken(token)){
            return null;
        }

        return logDao.getLogs();
    }
}
