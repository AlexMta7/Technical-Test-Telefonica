package com.project.user.dao;

import com.project.user.models.Clientes;
import com.project.user.models.Direcciones;
import com.project.user.models.Documentos;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.OneToMany;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class ClienteDaoImp implements ClienteDao{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Clientes> getClientes() {
        String query="From Clientes"; //Hace referencia al modelo creado
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Clientes clientes = entityManager.find(Clientes.class,id);
        entityManager.remove(clientes);
    }

    @Override
    public List<Clientes> getInfoClientes(Long id) {
        String query="From Clientes WHERE id = " + id ;
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void editar(Clientes cliente) {
        entityManager.merge(cliente);
    }

    @Override
    public void registro(Clientes cliente) {
        entityManager.merge(cliente);
    }

    @Override
    public List<Clientes> getInfoCliente(Long id) {
        String query="From Clientes WHERE id = " + id ;
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void agregar(Documentos documento) {
        entityManager.merge(documento);
    }

    @Override
    public void agregarD(Direcciones direcciones) {
        entityManager.merge(direcciones);
    }

    @Override
    public List<Documentos> getDocs() {
        String query="From Documentos"; //Hace referencia al modelo creado
        List<Documentos> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public List<Direcciones> getDir() {
        String query="From Direcciones"; //Hace referencia al modelo creado
        List<Direcciones> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public List<Documentos> getInfoDoc(Long id) {
        String query="From Documentos WHERE id = " + id ;
        List<Documentos> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void editarDoc(Documentos documentos) {
        entityManager.merge(documentos);
    }

    @Override
    public List<Direcciones> getInfoDirec(Long id) {
        String query="From Direcciones WHERE id = " + id ;
        List<Direcciones> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public void editarDire(Direcciones direcciones) {
        entityManager.merge(direcciones);
    }

    @Override
    public void eliminarDoc(Long id) {
        Documentos documentos = entityManager.find(Documentos.class,id);
        entityManager.remove(documentos);
    }

    @Override
    public void eliminarDirec(Long id) {
        Direcciones direcciones= entityManager.find(Direcciones.class,id);
        entityManager.remove(direcciones);
    }

    @Override
    public List<Clientes> getClient(String name) {
        String query="From Clientes WHERE nombre = " + name ;
        List<Clientes> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public List<Documentos> getClientByID(Long id) {
        String query="From Documentos WHERE id_client = " + id ;
        List<Documentos> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }

    @Override
    public List<Direcciones> getDirClientByID(Long id) {
        String query="From Direcciones WHERE id_client = " + id ;
        List<Direcciones> resultado = entityManager.createQuery(query).getResultList();

        return resultado;
    }
}
