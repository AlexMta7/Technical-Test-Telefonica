package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@ToString @EqualsAndHashCode
public class userModel {
    @Id
    @Getter @Setter @Column(name = "us_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter @Column(name = "us_name")
    private String name;

    @Getter @Setter @Column(name = "us_lastname")
    private String lastname;

    @Getter @Setter @Column(name = "us_email")
    private String email;

    @Getter @Setter @Column(name = "us_password")
    private String password;

    //Type: admin/noAdmin
    @Getter @Setter @Column(name = "us_type")
    private String type;
}
