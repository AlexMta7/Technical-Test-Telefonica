package com.project.user.controllers;

import com.project.user.models.documentModel;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.user.dao.DocumentDao;

@RestController
public class DocumentController {
    
    @Autowired
    private DocumentDao documentDao;

    @RequestMapping(value = "api/docs", method = RequestMethod.GET)
    public List<documentModel> getDocs() {
        return documentDao.getDocs();
    }

    @RequestMapping(value = "api/docs/{email}", method = RequestMethod.GET)
    public List<documentModel> getDoc(@PathVariable String email) {
        return documentDao.getDoc(email);
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
}
