package com.project.user.controllers;

import com.project.user.dao.ClienteDao;
import com.project.user.dao.UsuarioDao;
import com.project.user.models.Clientes;
import com.project.user.models.Direcciones;
import com.project.user.models.Documentos;
import com.project.user.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
public class ClienteController {
    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token){

        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }
    @RequestMapping(value = "api/clientes")
    public List<Clientes> getClientes(@RequestHeader(value = "Authorization") String token){
        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getClientes();
    }

    @RequestMapping(value = "api/clientes/{id}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id){

        clienteDao.eliminar(id);
    }

    @RequestMapping(value = "api/clientes/{id}", method = RequestMethod.GET )
    public List<Clientes> getInfoClientes(@PathVariable Long id){

        return clienteDao.getInfoClientes(id);
    }

    @RequestMapping(value = "api/cliente/{id}", method = RequestMethod.GET )
    public List<Clientes> getIdCliente(@PathVariable Long id){

        return clienteDao.getInfoCliente(id);
    }

    @RequestMapping(value = "api/cliente", method = RequestMethod.PUT)
    public void editarCliente(@RequestBody Clientes cliente){

        clienteDao.editar(cliente);
    }

    @RequestMapping(value = "api/clientes", method = RequestMethod.POST)
    public void registrarCliente(@RequestHeader(value = "Authorization") String token, @RequestBody Clientes cliente){

        if (!validarToken(token)){
            return;
        }

        clienteDao.registro(cliente);
    }

    /* ********** Métodos para el manejo de información de los Documentos y Direcciones ********* */

    @RequestMapping(value = "api/documentos", method = RequestMethod.POST)
    public void addDocuments(@RequestBody Documentos documento){
        clienteDao.agregar(documento);
    }

    @RequestMapping(value = "api/direcciones", method = RequestMethod.POST)
    public void addAddress(@RequestBody Direcciones direcciones){
        clienteDao.agregarD(direcciones);
    }

    @RequestMapping(value = "api/docs/clients")
    public List<Documentos> getDocs(@RequestHeader(value = "Authorization") String token){

        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getDocs();
    }

    @RequestMapping(value = "api/address/clients")
    public List<Direcciones> getDir(@RequestHeader(value = "Authorization") String token){

        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getDir();
    }



    @RequestMapping(value = "api/docs/client/{id}", method = RequestMethod.GET )
    public List<Documentos> getInfoDoc(@PathVariable Long id){

        return clienteDao.getInfoDoc(id);
    }

    @RequestMapping(value = "api/docs/client", method = RequestMethod.PUT)
    public void editarDocCli(@RequestBody Documentos documentos){

        clienteDao.editarDoc(documentos);
    }

    @RequestMapping(value = "api/direc/client/{id}", method = RequestMethod.GET )
    public List<Direcciones> getInfoDirec(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){

        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getInfoDirec(id);
    }

    @RequestMapping(value = "api/dire/client", method = RequestMethod.PUT)
    public void editarDirecCli(@RequestBody Direcciones direcciones){
        clienteDao.editarDire(direcciones);
    }

    @RequestMapping(value = "api/docs/client/{id}", method = RequestMethod.DELETE)
    public void eliminarDoc(@PathVariable Long id){
        clienteDao.eliminarDoc(id);
    }

    @RequestMapping(value = "api/direc/client/{id}", method = RequestMethod.DELETE)
    public void eliminarDirec(@PathVariable Long id){
        clienteDao.eliminarDirec(id);
    }

    @RequestMapping(value = "api/client/{name}", method = RequestMethod.GET )
    public List<Clientes> getClient(@RequestHeader(value = "Authorization") String token, @PathVariable String name){
        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getClient(name);
    }

    @RequestMapping(value = "api/search/docs/client/{id}", method = RequestMethod.GET )
    public List<Documentos> getClientByID(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getClientByID(id);
    }

    @RequestMapping(value = "api/search/dirs/client/{id}", method = RequestMethod.GET )
    public List<Direcciones> getDirClientByID(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getDirClientByID(id);
    }

    @RequestMapping(value = "api/search/client/{name}", method = RequestMethod.GET )
    public List<Clientes> getClientByName(@RequestHeader(value = "Authorization") String token, @PathVariable String name){
        if (!validarToken(token)){
            return null;
        }

        return clienteDao.getClientByName(name);
    }
}
