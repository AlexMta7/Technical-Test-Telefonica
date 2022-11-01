package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "documents")
@Getter @Setter
@ToString @EqualsAndHashCode
public class documentModel {

    @Id
    @Column(name = "doc_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doc_client_id")
    private Long client_id;

    @Column(name = "doc_type")
    private String type;
    
    @Column(name = "doc_document")
    private String document;
}
