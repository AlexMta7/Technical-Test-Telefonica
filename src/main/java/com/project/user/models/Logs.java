package com.project.user.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Repository
@Table(name = "actions_logs")
public class Logs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id_log;

    @Getter @Setter @Column(name = "user_id")
    private Long id_usu;

    @Getter @Setter @Column(name = "action")
    private String action;

    @Getter @Setter @Column(name = "date")
    private String date;

}
