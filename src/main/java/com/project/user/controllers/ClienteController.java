package com.project.user.controllers;

import com.project.user.dao.ClienteDao;
import com.project.user.models.Clientes;
import com.project.user.models.Direcciones;
import com.project.user.models.Documentos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
public class ClienteController {
    @Autowired
    private ClienteDao clienteDao;

    @RequestMapping(value = "api/clientes")
    public List<Clientes> getClientes(){

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
    public void registrarCliente(@RequestBody Clientes cliente){
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
    public List<Documentos> getDocs(){

        return clienteDao.getDocs();
    }

    @RequestMapping(value = "api/address/clients")
    public List<Direcciones> getDir(){

        return clienteDao.getDir();
    }

    @RequestMapping(value = "api/docs/client/{id}", method = RequestMethod.GET )
    public List<Documentos> getInfoDoc(@PathVariable Long id){

        return clienteDao.getInfoDoc(id);
    }

}
