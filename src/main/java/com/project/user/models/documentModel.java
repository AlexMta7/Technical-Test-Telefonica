package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "documents")
@ToString @EqualsAndHashCode
public class documentModel {
    
    @Id
    @ManyToOne
    @Getter @Setter @JoinColumn(name = "doc_client_id")
    private userModel clientId;

    @Getter @Setter @Column(name = "doc_dui")
    private String dui;
    
    @Getter @Setter @Column(name = "doc_passport")
    private String passport;

    @Getter @Setter @Column(name = "doc_isss")
    private String isss;

    @Getter @Setter @Column(name = "doc_nit")
    private String nit;

    @Getter @Setter @Column(name = "doc_other")
    private String other;
}
