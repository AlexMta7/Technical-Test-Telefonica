package com.project.user.controllers;

import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuarios> getUsuarios(){

        return usuarioDao.getUsuarios();
    }
    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public List<Usuarios> getInfoUsuarios(@PathVariable Long id){

        return usuarioDao.getInfoUsuarios(id);
    }
    @RequestMapping(value = "api/usuarios", method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody Usuarios usuario){
        usuarioDao.editar(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable Long id){
        usuarioDao.eliminar(id);
    }
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuarios usuario){
        usuarioDao.registro(usuario);
    }

    @RequestMapping(value = "api/search/usuarios/{name}", method = RequestMethod.GET )
    public List<Usuarios> getUserByName(@PathVariable String name){

        return usuarioDao.getUserByName(name);
    }
}
