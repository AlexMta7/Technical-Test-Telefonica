package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@ToString @EqualsAndHashCode
public class addressModel {

    @Id
    @Column(name = "add_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @Getter @Setter @JoinColumn(name = "add_client_id")
    private userModel clientId;

    @Getter @Setter @Column(name = "add_address")
    private String address;
}
