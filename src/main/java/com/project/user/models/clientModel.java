package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "clients")
@Getter @Setter
@ToString @EqualsAndHashCode
public class clientModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "cli_name")
    private String name;

    @Column(nullable = false, name = "cli_lastname")
    private String lastname;

    @Column(nullable = false, name = "cli_email")
    private String email;

    @Column(nullable = false, name = "cli_service")
    private String service;

}
