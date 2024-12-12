package org.psm.inbox.chatmsg;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chatmessage")
public class ChatMessage {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String chatId;  //senderID_recipientId
    String senderId;
    String receiverId;
    String message;
    String timestamp;

}
