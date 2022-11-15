package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "logs")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class logModel {

    @Id
    @Column(name = "log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "log_user_id")
    private Long user_id;

    @Column(name = "log_action")
    private String action;

    @Column(name = "log_date")
    private String date;
}
