package com.project.iot.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "action")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device", nullable = false)
    private String device;

    @Column(name = "mode", nullable = false)
    private String mode;

    @Column(name = "time", nullable = false)
    private Date time;
}
