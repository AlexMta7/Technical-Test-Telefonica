package com.project.user.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString @EqualsAndHashCode
public class userModel {

    @Id
    @Column(unique = true, nullable = false, name = "us_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "us_name")
    private String name;

    @Column(name = "us_lastname")
    private String lastname;

    @Column(nullable = false, name = "us_email")
    private String email;

    @Column(nullable = false, name = "us_password")
    private String password;

    //Type: admin/noAdmin
    @Column(nullable = false, name = "us_type")
    private String type;
}

/*
"Para declarar que una clase debe ser tratada como bean de spring, hay que anotarla con @Component, @Service o @Repository. 
En el fondo spring las trata de la misma forma, pero tienen diferente valor semántico para la lectura de tu código. 
Si esa clase va a trabajar para acceder a datos de una base de datos, de un fichero, etc, queda mejor si le pones 
@Repository. Si la clase funciona como un clase de negocio que recibe una entrada y la transforma, lo suyo es usar 
@Service. Para todo los demás, @Component."
*/

