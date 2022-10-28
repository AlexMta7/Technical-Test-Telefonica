package com.project.user.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.persistence.*;

@Entity
@Repository
@Table(name = "documentos_cliente")
public class Documentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name="cliente_id")
    private Long id_client;

    @Getter @Setter @Column(name="nombre_documento")
    private String document_name;

    @Getter @Setter @Column(name="documento")
    private String document;
}
