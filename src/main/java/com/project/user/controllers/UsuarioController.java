package com.project.user.controllers;

import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Usuarios;
import com.project.user.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Service
@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token){

        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<Usuarios> getUsuarios(@RequestHeader(value = "Authorization") String token){
        if (!validarToken(token)){
            return null;
        }

        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/user/{id}", method = RequestMethod.GET)
    public List<Usuarios> getInfoUsuarios(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if (!validarToken(token)){
            return null;
        }

        return usuarioDao.getInfoUsuarios(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.PUT)
    public void editarUsuario(@RequestHeader(value = "Authorization") String token, @RequestBody Usuarios usuario){
        if (!validarToken(token)){
            return;
        }

        //Se implementa Hash para el guardado de la contraseña segura en la base de datos
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPass_usu());
        usuario.setPass_usu(hash);

        usuarioDao.editar(usuario);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if (!validarToken(token)){
            return;
        }

        usuarioDao.eliminar(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public void registrarUsuario(@RequestHeader(value = "Authorization") String token, @RequestBody Usuarios usuario){
        if (!validarToken(token)){
            return;
        }

        //Se implementa Hash para el guardado de la contraseña segura en la base de datos
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPass_usu());
        usuario.setPass_usu(hash);

        usuarioDao.registro(usuario);
    }

    @RequestMapping(value = "api/search/users/{name}", method = RequestMethod.GET )
    public List<Usuarios> getUserByName(@RequestHeader(value = "Authorization") String token, @PathVariable String name){
        if (!validarToken(token)){
            return null;
        }

        return usuarioDao.getUserByName(name);
    }

    @RequestMapping(value = "api/search/user/{email}", method = RequestMethod.GET )
    public List<Usuarios> getUserByEmail(@RequestHeader(value = "Authorization") String token, @PathVariable String email){
        if (!validarToken(token)){
            return null;
        }

        return usuarioDao.getUserByEmail(email);
    }
}
