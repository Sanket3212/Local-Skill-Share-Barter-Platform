<template>
     <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-8 px-4 flex-grow antialiased">
    <div class="max-w-xl mx-auto bg-black/40 backdrop-blur-md p-0 rounded-2xl border border-white/10 shadow-2xl-custom-glow-alt text-white overflow-hidden md:min-h-[70vh] min-h-[85vh] flex flex-col">

      <div class="bg-gray-800/50 p-6 border-b border-white/10 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-md">
          Chats
        </h1>
        <NuxtLink to="/messages/new" class="text-teal-400 hover:text-green-400 transition-colors duration-200" title="Start New Chat">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h2m-4 0h4m-4 0V9m4 0V9m-8 8l4-4 4 4m-4-4v4"></path>
          </svg>
        </NuxtLink>
      </div>

      <div v-if="loading" class="flex-grow flex items-center justify-center py-10">
        <svg class="animate-spin h-12 w-12 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-400 text-lg mt-4">Loading conversations...</p>
      </div>

      <div v-else-if="errorMsg" class="text-red-400 text-base text-center p-8 bg-red-900/20 border border-red-500/30 rounded-b-md mx-4 mb-4">
        <p class="mb-2">Oops! Something went wrong.</p>
        <p>{{ errorMsg }}</p>
      </div>

      <div v-else-if="conversations.length === 0" class="flex-grow flex flex-col items-center justify-center py-10 px-6 text-center">
        <svg class="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <p class="text-gray-300 text-xl font-medium mb-4">No conversations yet!</p>
        <p class="text-gray-400 text-lg max-w-sm mb-8">
          Start by Browse skills or items and contacting a lister to begin your first swap.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink to="/browse-skills" class="bg-green-600 text-white font-bold py-3 px-6 rounded-full text-base hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            Browse Skills
          </NuxtLink>
          <NuxtLink to="/browse-items" class="bg-teal-600 text-white font-bold py-3 px-6 rounded-full text-base hover:scale-105 hover:shadow-teal-500/30 shadow-2xl transition-all duration-300 inline-flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            Browse Items
          </NuxtLink>
        </div>
      </div>

      <div v-else class="flex-grow overflow-y-auto custom-scrollbar-thin pb-4">
        <NuxtLink
          v-for="conv in conversations"
          :key="conv.conversation_id"
          :to="`/messages/${conv.conversation_id}`"
          class="chat-list-item flex items-center p-4 cursor-pointer border-b border-gray-700/40 last:border-b-0
                 transition-all duration-200 ease-in-out hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
          :class="{ 'bg-gray-700/20': conv.unreadCount > 0 }"
        >
          <div class="flex-shrink-0 relative">
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white uppercase"
                 :class="conv.unreadCount > 0 ? 'bg-green-600' : 'bg-gray-600'">
              {{ conv.otherParticipantUsername.charAt(0) }}
            </div>
            </div>

          <div class="ml-4 flex-grow overflow-hidden">
            <div class="flex justify-between items-center mb-1">
              <h2 class="text-xl font-semibold text-white truncate" :class="{ 'font-bold': conv.unreadCount > 0 }">
                {{ conv.otherParticipantUsername }}
              </h2>
              <span class="text-xs text-gray-400 flex-shrink-0 ml-2" :class="{ 'text-green-400 font-semibold': conv.unreadCount > 0 }">
                {{ formatDistanceToNow(new Date(conv.lastMessageSentAt), { addSuffix: true }) }}
              </span>
            </div>
            <p class="text-gray-300 text-sm truncate pr-4" :class="{ 'font-bold text-white': conv.unreadCount > 0 }">
              {{ conv.lastMessageText || 'No message yet.' }}
            </p>
            <p v-if="conv.listingTitle" class="text-gray-500 text-xs mt-1 truncate">
              <span class="font-medium">About:</span> "{{ conv.listingTitle }}"
            </p>
          </div>

          <div v-if="conv.unreadCount > 0" class="flex-shrink-0 ml-4">
            <span class="bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
              {{ conv.unreadCount }}
            </span>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'; // Added watch import
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { formatDistanceToNow } from 'date-fns'; // For "x time ago" formatting

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const conversations = ref([]);
const loading = ref(true);
const errorMsg = ref('');

// Fetch conversations
const fetchConversations = async () => {
  loading.value = true;
  errorMsg.value = '';

  if (!user.value) {
    errorMsg.value = 'You must be logged in to view messages.';
    loading.value = false;
    return;
  }

  try {
    // Fetch all messages involving the current user, ordered by sent_at descending
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id, conversation_id, sender_id, receiver_id, message_text, sent_at, is_read, listing_id')
      .or(`sender_id.eq.${user.value.id},receiver_id.eq.${user.value.id}`)
      .order('sent_at', { ascending: false });

    if (messagesError) throw messagesError;

    if (!messages || messages.length === 0) {
      conversations.value = [];
      return;
    }

    // Process messages to group into conversations and get latest message
    const conversationMap = new Map(); // conversation_id -> latest message object
    const unreadCounts = new Map(); // conversation_id -> unread count for current user
    const participantIds = new Set(); // Collect all sender/receiver IDs for username lookup
    const listingIds = new Set(); // Collect all listing IDs for title lookup

    for (const msg of messages) {
      if (!msg.conversation_id) continue; // Skip messages without a conversation ID (shouldn't happen in a proper flow)

      // Always keep the *latest* message for each conversation
      if (!conversationMap.has(msg.conversation_id) || new Date(msg.sent_at) > new Date(conversationMap.get(msg.conversation_id).sent_at)) {
        conversationMap.set(msg.conversation_id, msg);
      }

      // Count unread messages for the current user
      if (msg.receiver_id === user.value.id && !msg.is_read) {
        unreadCounts.set(msg.conversation_id, (unreadCounts.get(msg.conversation_id) || 0) + 1);
      }

      // Collect participant IDs
      participantIds.add(msg.sender_id);
      participantIds.add(msg.receiver_id);

      // Collect listing IDs
      if (msg.listing_id) {
        listingIds.add(msg.listing_id);
      }
    }

    // Fetch usernames for all participants
    let usernames = new Map(); // user_id -> username
    if (participantIds.size > 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, username')
        .in('id', Array.from(participantIds));

      if (usersError) console.error('Error fetching usernames:', usersError.message);
      usersData?.forEach(u => usernames.set(u.id, u.username));
    }

    // Fetch titles for all listings involved
    let listingTitles = new Map(); // listing_id -> title
    if (listingIds.size > 0) {
      const { data: listingsData, error: listingsError } = await supabase
        .from('skills') // Assuming 'listings' table in original was 'skills' based on previous context
        .select('id, skill_name') // Assuming 'title' column is actually 'skill_name'
        .in('id', Array.from(listingIds));

      if (listingsError) console.error('Error fetching listing titles:', listingsError.message);
      listingsData?.forEach(l => listingTitles.set(l.id, l.skill_name)); // Use skill_name
    }

    // Construct the final conversations array
    const processedConversations = Array.from(conversationMap.values())
      .map(latestMsg => {
        const otherParticipantId = latestMsg.sender_id === user.value.id ? latestMsg.receiver_id : latestMsg.sender_id;
        return {
          conversation_id: latestMsg.conversation_id,
          lastMessageText: latestMsg.message_text,
          lastMessageSentAt: latestMsg.sent_at,
          otherParticipantUsername: usernames.get(otherParticipantId) || 'Unknown User',
          unreadCount: unreadCounts.get(latestMsg.conversation_id) || 0,
          listingTitle: listingTitles.get(latestMsg.listing_id) || null,
        };
      })
      .sort((a, b) => new Date(b.lastMessageSentAt) - new Date(a.lastMessageSentAt)); // Sort by latest message overall

    conversations.value = processedConversations;

  } catch (error) {
    console.error('Error fetching conversations:', error.message);
    errorMsg.value = 'Failed to load messages: ' + error.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (user.value) {
    fetchConversations();
  } else {
    // If not logged in, fetchConversations will handle the error message.
  }
});

// Re-fetch conversations if user state changes (e.g., login/logout)
watch(user, (newUser) => {
  if (newUser) {
    fetchConversations();
  } else {
    conversations.value = [];
    loading.value = false;
    errorMsg.value = 'Please log in to view your messages.';
  }
});
</script>

<style scoped>
/* Reusing custom glow shadow from previous components */
.shadow-2xl-custom-glow-alt {
    box-shadow: 0 0 50px rgba(20, 184, 166, 0.1),
                0 0 20px rgba(22, 163, 74, 0.08),
                0 20px 40px -10px rgba(0,0,0,0.3);
}

.drop-shadow-md {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Custom Scrollbar for the chat list */
.custom-scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05); /* Input Surface color */
  border-radius: 10px;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #14b8a6; /* Primary Teal */
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.05); /* Border matching track */
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #2dd4bf; /* Secondary Teal on hover */
}
</style>