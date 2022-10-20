package com.project.user.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "datos_cliente")
public class Clientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name="id")
    private Long id;

    @Getter @Setter @Column(name="name")
    private String nombre;

    @Getter @Setter @Column(name="last_name")
    private String apellido;

    @Getter @Setter @Column(name="gender")
    private String genero;

    @Getter @Setter @Column(name="document")
    private String documento;

    @Getter @Setter @Column(name="email")
    private String email;
}
