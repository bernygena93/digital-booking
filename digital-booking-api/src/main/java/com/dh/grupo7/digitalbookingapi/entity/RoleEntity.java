package com.dh.grupo7.digitalbookingapi.entity;

import com.dh.grupo7.digitalbookingapi.enums.RoleName;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Roles")
@Getter
@Setter
public class RoleEntity implements Serializable {
    @Id
    @SequenceGenerator(name = "administrator_sequence", sequenceName = "administrator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "administrator_sequence")
    private Long id;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column
    private RoleName roleName;

    public RoleEntity() {
    }

    public RoleEntity(RoleName roleName) {
        this.roleName = roleName;
    }
}
