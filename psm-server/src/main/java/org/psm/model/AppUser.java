package org.psm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.sql.Date;

//appuser table in PSM database


@Entity
@Data
@Table(name="appuser")
public class AppUser {

    @Id
    private String userid;
    private String email;
    private String pwd;
    private String familyid;
    private String profilename;
    private Date signup_date;
}
