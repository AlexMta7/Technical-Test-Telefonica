/*package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "documents")
@Getter @Setter
@ToString @EqualsAndHashCode
public class documentModel {

    @Id
    @ManyToOne
    @JoinColumn(name = "doc_client_id")
    private userModel clientId;

    @Column(name = "doc_dui")
    private String dui;
    
    @Column(name = "doc_passport")
    private String passport;

    @Column(name = "doc_isss")
    private String isss;

    @Column(name = "doc_nit")
    private String nit;

    @Column(name = "doc_other")
    private String other;
}
*/