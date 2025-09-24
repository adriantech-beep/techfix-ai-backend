// const conversations = new Map();

// export const conversationRepository = {
//   getHistory(conversationId) {
//     return conversations.get(conversationId) || [];
//   },
//   addMessage(conversationId, role, content) {
//     const history = conversations.get(conversationId) || [];
//     history.push({ role, content });
//     conversations.set(conversationId, history);
//   },
// };

// repositories/conversation.repository.js
const conversations = new Map(); // { conversationId: [{role, message}] }

export const conversationRepository = {
  getHistory(conversationId) {
    return conversations.get(conversationId) || [];
  },
  addMessage(conversationId, message) {
    const history = conversations.get(conversationId) || [];
    history.push(message);
    conversations.set(conversationId, history);
  },
  clear(conversationId) {
    conversations.delete(conversationId);
  },
};
