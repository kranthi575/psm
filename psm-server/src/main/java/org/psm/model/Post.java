package org.psm.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long postid;

    String posttitle;
    String postdesc;
    String postowner;
    String postfamily;
    Date postdate;

}
