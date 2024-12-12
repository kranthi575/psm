package org.psm.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "familygrp")
public class FamilyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long familyId;

    String familyName;
    String familyDesc;
    Date signup_date;
    String familyProfilePicCid;


}
