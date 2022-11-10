package com.project.user.controllers.rest;

import com.project.user.models.documentModel;
import com.project.user.services.DocumentServices;
import com.project.user.utils.JWTUtil;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.user.dao.DocumentDao;

@RestController
public class DocumentController {

    @Autowired
    private DocumentDao documentDao;

    // Actualmente no se está utilizando
    @Autowired
    private DocumentServices documentServices;

    @Autowired
    private JWTUtil jwtUtil;

    /*
     * Create
     * Read
     * Update
     * Delete
     */

    // * Create
    // Crea un documento si el usuario está logueado
    @RequestMapping(value = "api/docs", method = RequestMethod.POST)
    public String addDocs(@RequestBody documentModel document, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        documentDao.addDocs(document);
        return "OK";
    }

    // * Read
    // Obtiene los documentos de un usuario específico si el usuario ue busca está
    // logueado
    @RequestMapping(value = "api/docs/{id}", method = RequestMethod.GET)
    public List<documentModel> getDoc(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return documentDao.getDoc(id);
    }

    // * Update
    // Actualiza los documentos de un usuario con id: x
    @RequestMapping(value = "api/docs", method = RequestMethod.PUT)
    public String updateDocs(@RequestBody documentModel document,
            @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }

        documentDao.updateDocs(document);
        return "OK";
    }

    // * Delete
    // Elimina un documento especifico si el usuario está logueado
    @RequestMapping(value = "api/docs/{id}", method = RequestMethod.DELETE)
    public void deleteDoc(@PathVariable Long id, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            System.out.println("It's not possible to delete client");
        } else {
            documentDao.deleteDoc(id);
        }
    }

    // Obtiene todos los documentos
    @RequestMapping(value = "api/docs", method = RequestMethod.GET)
    public List<documentModel> getDocs(@RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return documentDao.getDocs();
    }

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }

    // Actualmente no se está utilizando
    // Eliminar por email para que al momento de eliminar un cliente con email x, se
    // elimine todo el documento/direcione relacionado
    @RequestMapping(value = "api/docs/delete/{email}", method = RequestMethod.DELETE)
    public String deleteDocumentByEmail(@PathVariable String email) {
        documentServices.deleteByEmail(email);
        return "OK";
    }

}
