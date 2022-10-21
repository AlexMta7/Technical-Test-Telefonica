package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
public class userModel {

    @Id
    @Column(unique = true, nullable = false, name = "us_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "us_name")
    private String name;

    @Column(name = "us_lastname")
    private String lastname;

    @Column(nullable = false, name = "us_email")
    private String email;

    @Column(nullable = false, name = "us_password")
    private String password;

    //Type: admin/noAdmin
    @Column(nullable = false, name = "us_type")
    private String type;
}
