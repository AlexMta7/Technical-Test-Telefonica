package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "adresses")
@ToString @EqualsAndHashCode
public class addressModel {
    
    @Id
    @ManyToOne
    @Getter @Setter @JoinColumn(name = "addr_client_id")
    private userModel clientId;

    @Getter @Setter @Column(name = "add_address")
    private String address;
}
