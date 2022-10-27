package com.project.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.user.repository.DocumentRepository;

@Service
public class DocumentServices {
    @Autowired
    DocumentRepository documentRepository;

    public String deleteByEmail(String email) {
        documentRepository.deleteDocumentByEmail(email);
        return "Ok";
    }
}
