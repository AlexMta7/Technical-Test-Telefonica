package com.project.user.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name="id")
    private Long id;

    @Getter @Setter @Column(name="name")
    private String nombre;

    @Getter @Setter @Column(name="last_name")
    private String apellido;

    @Getter @Setter @Column(name="password")
    private String password;

    @Getter @Setter @Column(name="type")
    private String cargo;

    @Getter @Setter @Column(name="email")
    private String email;

}
