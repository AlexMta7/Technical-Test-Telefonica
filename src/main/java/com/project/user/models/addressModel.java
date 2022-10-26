package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter @Setter
@ToString @EqualsAndHashCode
public class addressModel {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "add_client_id")
    private String client_id;

    @Column(name = "add_type")
    private String type;

    @Column(name = "add_address")
    private String address;
}