package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
@ToString @EqualsAndHashCode
public class userModel {
    @Id
    @Column(name = "us_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "us_name")
    private String name;

    @Column(name = "us_lastname")
    private String lastname;

    @Column(name = "us_email")
    private String email;

    @Column(name = "us_password")
    private String password;

    //Type: admin/noAdmin
    @Column(name = "us_type")
    private String type;
}
