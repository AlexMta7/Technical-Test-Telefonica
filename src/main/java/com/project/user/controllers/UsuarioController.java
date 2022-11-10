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

    @RequestMapping(value = "api/users", method
= RequestMethod.GET)
    public List<Usuarios> getUsuarios(){
        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/user/{id}", method = RequestMethod.GET)
    public List<Usuarios> getInfoUsuarios(@PathVariable Long id){
        return usuarioDao.getInfoUsuarios(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody Usuarios usuario){
        //Se implementa Hash para el guardado de la contraseña segura en la base de datos
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPass_usu());
        usuario.setPass_usu(hash);

        usuarioDao.editar(usuario);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable Long id){
        usuarioDao.eliminar(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuarios usuario){
        //Se implementa Hash para el guardado de la contraseña segura en la base de datos
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPass_usu());
        usuario.setPass_usu(hash);

        usuarioDao.registro(usuario);
    }

    @RequestMapping(value = "api/search/users/{name}", method = RequestMethod.GET )
    public List<Usuarios> getUserByName(@PathVariable String name){
        return usuarioDao.getUserByName(name);
    }

    @RequestMapping(value = "api/search/user/{email}", method = RequestMethod.GET )
    public List<Usuarios> getUserByEmail(@PathVariable String email){
        return usuarioDao.getUserByEmail(email);
    }
}
