package com.project.user.dao;

import java.util.List;

import com.project.user.models.documentModel;

public interface DocumentDao {

    // Obtiene todas los documentos
    List<documentModel> getDocs();

    // Obtiene todos los documentos de un usuario específico
    List<documentModel> getDoc(Long email);

    documentModel addDocs(documentModel document);

    documentModel updateDocs(documentModel document);

    void deleteDoc(Long id);

}
