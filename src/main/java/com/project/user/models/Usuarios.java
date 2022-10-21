package com.project.user.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.persistence.*;

@Entity
@Repository
@Table(name = "usuarios")
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name="id")
    private Long id_usu;

    @Getter @Setter @Column(name="name")
    private String nom_usu;

    @Getter @Setter @Column(name="last_name")
    private String ln_usu;

    @Getter @Setter @Column(name="email")
    private String email_usu;

    @Getter @Setter @Column(name="password")
    private String pass_usu;

    @Getter @Setter @Column(name="type")
    private String car_usu;
}
