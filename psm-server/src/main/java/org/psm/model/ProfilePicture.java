package org.psm.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data

public class ProfilePicture{

    @Id
    private String userid;
    private String user_cid;
}
