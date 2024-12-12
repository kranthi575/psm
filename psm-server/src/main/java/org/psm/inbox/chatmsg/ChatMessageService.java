package org.psm.inbox.chatmsg;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {


  private final  ChatMessageRepo chatMessageRepo;

    //save the chat
    public ChatMessage saveChatMessage(ChatMessage chatMessage) {

        String chatId = createChatId(chatMessage);
        chatMessage.setChatId(chatId);
        return chatMessageRepo.save(chatMessage);


    }

    public String createChatId(ChatMessage chatMessage) {

        return chatMessage.getSenderId()+"_"+chatMessage.getReceiverId();
    }


    public List<ChatMessage> findChatMsgs(String senderId, String receiverId) {
        // Step 1: Create the list of chat IDs
        List<String> chatIds = new ArrayList<>();
        chatIds.add(senderId + "_" + receiverId);
        chatIds.add(receiverId + "_" + senderId);

        // Step 2: Query the repository for matching chat messages
        List<ChatMessage> result = new ArrayList<>();
        for (String chatId : chatIds) {
            List<ChatMessage> messages = chatMessageRepo.findByChatId(chatId);
            if (messages != null) {
                result.addAll(messages); // Add all messages for the current chatId
            }
        }

        // Step 3: Return the result
        return result;
    }
}
