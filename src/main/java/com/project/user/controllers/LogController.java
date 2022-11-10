package com.project.user.controllers;

import com.project.user.dao.LogDao;
import com.project.user.dao.UsuarioDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
public class LogController {
    @Autowired
    private LogDao logDao;

    @Autowired
    private UsuarioDao usuarioDao;
}
