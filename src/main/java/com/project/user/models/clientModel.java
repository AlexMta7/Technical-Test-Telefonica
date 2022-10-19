package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "clients")
@ToString @EqualsAndHashCode
public class clientModel {
    @Id
    @Getter @Setter @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter @Column(name = "cli_name")
    private String name;

    @Getter @Setter @Column(name = "cli_lastname")
    private String lastname;

    @Getter @Setter @Column(name = "cli_email")
    private String email;

    @Getter @Setter @Column(name = "cli_service")
    private String service;

}
