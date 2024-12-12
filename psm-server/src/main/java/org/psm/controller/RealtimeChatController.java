package org.psm.controller;


import org.psm.inbox.chatmsg.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

//websocket controller to perform real-time chatting
public class RealtimeChatController {

    //help to create simple message template
    private SimpMessagingTemplate simpmessagingTemplate;


    @MessageMapping("/message")
    @SendTo("/group/public")
    public ChatMessage reciveMessage(@Payload ChatMessage message){

        simpmessagingTemplate.convertAndSend("/group/"+ message.getId(),message);

        return message;

    }
}

