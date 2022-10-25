package com.project.user.dao;

import java.util.List;

import com.project.user.models.documentModel;

public interface DocumentDao {

    List<documentModel> getDocs();

    List<documentModel> getDoc(String email);

    documentModel addDocs(documentModel document);

    documentModel updateDocs(documentModel document);
    
}
