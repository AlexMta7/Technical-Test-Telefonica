package com.project.user.controllers.rest;

import com.project.user.models.documentModel;
import com.project.user.services.DocumentServices;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.user.dao.DocumentDao;

@RestController
public class DocumentController {
    
    @Autowired
    private DocumentDao documentDao;

    @Autowired
    private DocumentServices documentServices;

    @RequestMapping(value = "api/docs", method = RequestMethod.GET)
    public List<documentModel> getDocs() {
        return documentDao.getDocs();
    }

    @RequestMapping(value = "api/docs/{id}", method = RequestMethod.GET)
    public List<documentModel> getDoc(@PathVariable Long id) {
        return documentDao.getDoc(id);
    }
    
    @RequestMapping(value = "api/docs", method = RequestMethod.POST)
    public String addDocs(@RequestBody documentModel document) {
        documentDao.addDocs(document);
        return "OK";
    }

    @RequestMapping(value = "api/docs", method = RequestMethod.PUT)
    public String updateDocs(@RequestBody documentModel document) {
        documentDao.updateDocs(document);
        return "OK";
    }
    
    @RequestMapping(value = "api/docs/{id}", method = RequestMethod.DELETE)
    public void deleteDoc(@PathVariable Long id) {
        documentDao.deleteDoc(id);
    }
    
    /*Eliminar por email para que al momento de eliminar un cliente con email x, se elimine todo el documento/direcione relacionado*/
    @RequestMapping(value = "api/docs/delete/{email}", method = RequestMethod.DELETE)
    public String deleteDocumentByEmail(@PathVariable String email){
        documentServices.deleteByEmail(email);
        return "OK";
    }
}
