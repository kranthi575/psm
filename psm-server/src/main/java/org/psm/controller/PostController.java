package org.psm.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.psm.model.CreatePost;
import org.psm.model.Post;
import org.psm.repository.PostsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private final PostsRepo postsRepo;

    //writing method to save post in database
    @PostMapping(value = "/savepost")
    public ResponseEntity<String> savePost(@RequestBody CreatePost createPost) {

        //reading parameters
        Post post = new Post();
        post.setPosttitle(createPost.postTitle());
        System.out.println(createPost.postDesc());
        if(createPost.postDesc().isEmpty()){
            return ResponseEntity.notFound().build();
        }
        post.setPostdesc(createPost.postDesc());
        post.setPostowner(createPost.postOwner());
        post.setPostfamily(createPost.postFamily());
        post.setPostdate(new Date(System.currentTimeMillis()));

        //saving post to database
        Post savePost=postsRepo.save(post);

        if(savePost!=null)
            return ResponseEntity.ok("Post Saved");
        else
            return ResponseEntity.status(400).body("Post Not Saved");
    }


    //write function to retrieve all posts related to familyID
    //passing familyid and jwttoken
    @GetMapping(value="/getFamilyIdPosts")
    public ResponseEntity<List<Post>> getFamilyPosts(HttpServletRequest request) {

        String familyId = request.getParameter("familyid");

        List<Post> familyPosts=postsRepo.findBypostfamily(familyId);
        if(!familyPosts.isEmpty()){
            //System.out.println(familyPosts.get().toString());
            return ResponseEntity.status(200).body(familyPosts);
        }else{
            System.out.println("no posts found with familyId"+familyId);
            return ResponseEntity.status(400).body(null);
        }


    }


}
