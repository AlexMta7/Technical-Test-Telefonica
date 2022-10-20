/*package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter @Setter
@ToString @EqualsAndHashCode
public class addressModel {

    @Id
    @ManyToOne
    @JoinColumn(name = "add_client_id")
    private userModel clientId;

    @Column(name = "add_address")
    private String address;
}
*/