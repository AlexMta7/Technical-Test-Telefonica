package com.project.user.controllers;

import com.project.user.dao.UsuarioDao;
import com.project.user.models.Usuarios;
import com.project.user.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuarios usuarios){

        Usuarios usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuarios);

        if (usuarioLogueado != null){

            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId_usu()), usuarioLogueado.getEmail_usu());

            return tokenJwt;
        }

        return "FAIL";
    }
}
