package com.project.user.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.persistence.*;

@Entity
@Repository
@Table(name = "direcciones_cliente")
public class Direcciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name="client_id")
    private Long id_client;

    @Getter @Setter @Column(name="type_address")
    private String name_address;

    @Getter @Setter @Column(name="address")
    private String address;
}
