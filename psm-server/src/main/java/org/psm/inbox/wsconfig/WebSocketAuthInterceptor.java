package org.psm.inbox.wsconfig;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class WebSocketAuthInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {
        // Extract token from headers (or query parameters)
        String authToken = request.getHeaders().getFirst("Authorization");

        // Validate token (pseudo-code: replace with actual validation logic)
        if (authToken != null && validateToken(authToken)) {
            // Add user details to the WebSocket session attributes if needed
            attributes.put("user", extractUserFromToken(authToken));
            return true; // Handshake proceeds
        }
        return false; // Handshake is denied
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception ex) {
        // Optional: Implement any post-handshake logic
    }

    private boolean validateToken(String token) {
        // Your JWT or token validation logic here
        return true; // For example, return true if valid
    }

    private String extractUserFromToken(String token) {
        // Extract user information from the token
        return "username";
    }
}
