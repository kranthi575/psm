package org.psm.inbox.chatmsg;


import lombok.RequiredArgsConstructor;
import org.psm.model.AppUser;
import org.psm.repository.AppUserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final AppUserRepo appUserRepo;
    //we will receive senderID, recipientId, content

    //instance chatting
    @MessageMapping("/chat")
    public void sendMsgToRecipient(@Payload ChatMessage chatMessage) {


        System.out.println("sendMsgToRecipient :: "+chatMessage.toString());

        ChatMessage savedMsg=chatMessageService.saveChatMessage(chatMessage);

        ChatNotification chatNotification = new ChatNotification(
                savedMsg.getChatId(),
                savedMsg.getSenderId(),
                savedMsg.getReceiverId(),
                savedMsg.getMessage(),
                new Date().toString()
        );
        // Send the notification as a JSON object (via messagingTemplate)
//        messagingTemplate.convertAndSendToUser(
//                chatMessage.getSenderId(), "/queue/messages",
//                chatNotification // This should be an object, not a string
//        );


        //retrieving receiver mailId

        AppUser appUser=appUserRepo.findByUserid(savedMsg.getReceiverId());

        messagingTemplate.convertAndSend("/queue/user/" +savedMsg.senderId+"/"+appUser.getEmail(), chatNotification);

//        messagingTemplate.convertAndSendToUser(
//                chatMessage.getReceiverId(), "/queue/messages",
//                new ChatNotification(
//                        savedMsg.getChatId(),
//                        savedMsg.getSenderId(),
//                        savedMsg.getReceiverId(),
//                        savedMsg.getMessage()
//                )
//        );
    }
    //we need to send the chat history of combination senderId_recipientId and recipientId_senderId
    //adjust sender on right side
    //fetch chat messages

    @GetMapping("/messages/{senderId}/{receiverId}")
    public ResponseEntity<List<ChatMessage>> findChat(@PathVariable("senderId") String senderId, @PathVariable("receiverId") String receiverId) {

       return ResponseEntity.ok(chatMessageService.findChatMsgs(senderId,receiverId));

    }

}
