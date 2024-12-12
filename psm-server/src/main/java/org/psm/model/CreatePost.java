package org.psm.model;

public record CreatePost(String postTitle,
                         String postDesc,
                         String postOwner,
                         String postFamily) {
}
