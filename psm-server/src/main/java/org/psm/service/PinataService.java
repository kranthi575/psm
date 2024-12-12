package org.psm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Map;

@Service
public class PinataService {

    @Value("${pinata.api.key}")
    private String pinataApiKey;

    @Value("${pinata.api.secret}")
    private String pinataApiSecret;

    @Value("${pinata.api.jwt}")
    private String pinataApiJwt;


    public String uploadToPinata(InputStream fileStream, String fileName) {
        String url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        System.out.println("upload to pinata method is triggered");

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost post = new HttpPost(url);

            // Set API Key and Secret in Headers
            post.setHeader("pinata_api_key", pinataApiKey);
            post.setHeader("pinata_secret_api_key", pinataApiSecret);

            post.setHeader("Authorization", "Bearer "+pinataApiJwt);

            // Build Multipart Form Data
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder.addBinaryBody("file", fileStream, ContentType.DEFAULT_BINARY, fileName);

            post.setEntity(builder.build());
            System.out.println("post method is triggered");
           // System.out.println(EntityUtils.toString(post.getEntity()));
            // Execute Request
            CloseableHttpResponse response = httpClient.execute(post);
            String responseBody = EntityUtils.toString(response.getEntity());

            // Extract CID from the Response
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> jsonResponse = mapper.readValue(responseBody, Map.class);
            System.out.println("json response is " + (String) jsonResponse.get("IpfsHash"));
            return (String) jsonResponse.get("IpfsHash"); // CID
        } catch (Exception e) {
            System.out.println("error in pinata upload");
            e.printStackTrace();
            return null;
        }
    }
}
