package org.psm.inbox.chatmsg;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepo extends CrudRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatId(String chatId);
}
