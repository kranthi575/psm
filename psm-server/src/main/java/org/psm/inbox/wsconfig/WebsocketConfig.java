package org.psm.inbox.wsconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;




// WS-Step#1
//creating websocketConfig file which helps is creating end points
@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    //help to pass msg from server to client
    //for user specific :: /queue/<api>
    //for group :: /topic

    //help to communicate from client to server
    //sending request :: /app/ <@MesssageMapping("\">
    @Override
    public void configureMessageBroker (MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic","/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    //help to establish connection
    @Override
    public void registerStompEndpoints (StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000").withSockJS();
    }
}