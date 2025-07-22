<template>
  <div class="container mx-auto py-12 px-4 flex-grow antialiased">
    <div class="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl p-0 rounded-2xl border border-white/10 shadow-2xl-custom-glow-alt text-white flex flex-col h-[80vh] overflow-hidden">
      
      <div class="flex items-center p-4 md:p-6 border-b border-white/10 bg-gray-800/50">
        <NuxtLink to="/messages" class="text-teal-400 hover:text-green-300 transition-colors duration-200 mr-4">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 flex-grow drop-shadow-md">
          Chat with <span class="text-white">{{ otherParticipantUsername || '...' }}</span>
        </h1>
      </div>

      <p v-if="listingTitle" class="text-gray-400 text-center text-sm px-4 pt-3 pb-2 bg-black/30 border-b border-gray-700/50">
        About: "<span class="font-medium text-teal-300">{{ listingTitle }}</span>"
      </p>


      <div v-if="loadingMessages" class="text-center py-10 flex-grow flex flex-col items-center justify-center">
        <svg class="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-white ml-4 text-lg">Loading messages...</p>
      </div>

      <div v-else-if="messagesErrorMsg" class="text-red-400 text-base text-center p-8 bg-red-900/20 border border-red-500/30 rounded-b-lg mx-4 mb-4 flex-grow flex items-center justify-center">
        <p>{{ messagesErrorMsg }}</p>
      </div>

      <div v-else class="flex-grow overflow-y-auto space-y-4 p-4 custom-scrollbar bg-black/20">
        <div v-for="msg in messages" :key="msg.id" :class="[msg.sender_id === user.id ? 'flex justify-end' : 'flex justify-start']">
          <div :class="[msg.sender_id === user.id ? 'bg-green-700/80 text-white rounded-tr-none' : 'bg-gray-700/50 text-white rounded-tl-none']" class="rounded-xl p-3 max-w-[80%] break-words shadow-md">
            <p class="text-xs font-semibold mb-1" :class="[msg.sender_id === user.id ? 'text-green-200' : 'text-teal-400']">
              {{ msg.sender_id === user.id ? 'You' : otherParticipantUsername }}
            </p>
            <p class="text-base">{{ msg.message_text }}</p>
            <p class="text-xs text-gray-300 mt-1 text-right opacity-80">{{ format(new Date(msg.sent_at), 'p M/d') }}</p>
          </div>
        </div>
        <div ref="messagesEndRef"></div>
      </div>

      <form @submit.prevent="sendMessage" class="flex gap-4 p-4 border-t border-white/10 bg-gray-800/50">
        <input
          type="text"
          v-model="newMessageText"
          placeholder="Type your message..."
          class="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          :disabled="sendingMessage"
          required
        />
        <button
          type="submit"
          class="bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-500 transition-colors duration-300 ease-out flex items-center justify-center"
          :disabled="sendingMessage || !newMessageText.trim()"
        >
          <svg v-if="!sendingMessage" class="w-6 h-6 transform rotate-45 -mt-1 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          <svg v-else class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { format } from 'date-fns';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const conversationId = ref(null);
const otherParticipantId = ref(null);
const otherParticipantUsername = ref('');
const listingId = ref(null);
const listingTitle = ref('');
const messages = ref([]);
const newMessageText = ref('');
const loadingMessages = ref(true);
const messagesErrorMsg = ref('');
const sendingMessage = ref(false);

const messagesEndRef = ref(null);

let messageSubscription = null;

watch(user, (currentUser) => {
  if (!currentUser) {
    router.push('/login');
  }
}, { immediate: true });

const fetchMessagesAndDetails = async () => {
  loadingMessages.value = true;
  messagesErrorMsg.value = '';
  messages.value = [];
  otherParticipantUsername.value = '';
  listingTitle.value = '';

  conversationId.value = route.params.id;

  if (!conversationId.value) {
    messagesErrorMsg.value = 'No conversation selected.';
    loadingMessages.value = false;
    return;
  }

  try {
    // 1. Fetch existing messages for this conversation
    const { data: fetchedMessages, error: messagesError } = await supabase
      .from('messages')
      .select('id, sender_id, receiver_id, message_text, sent_at, is_read, listing_id')
      .eq('conversation_id', conversationId.value)
      .order('sent_at', { ascending: true });

    if (messagesError) throw messagesError;

    if (fetchedMessages && fetchedMessages.length > 0) {
      messages.value = fetchedMessages;
      const firstMessage = fetchedMessages[0];
      otherParticipantId.value = firstMessage.sender_id === user.value.id
        ? firstMessage.receiver_id
        : firstMessage.sender_id;
      listingId.value = firstMessage.listing_id;
    } else {
      // New conversation: populate details from query parameters
      otherParticipantId.value = route.query.recipientId;
      listingId.value = route.query.listingId;
      messagesErrorMsg.value = 'Start the conversation by sending the first message!';
    }

    // Crucial validation after attempting to populate IDs
    if (!otherParticipantId.value) {
      messagesErrorMsg.value = 'Missing recipient information to start/view chat.';
      loadingMessages.value = false;
      return;
    }

    // --- KEY CHANGE HERE: Fetch other participant's username from 'profiles' table ---
    if (otherParticipantId.value) {
      const { data: otherUser, error: userError } = await supabase
        .from('profiles') // Assuming 'profiles' table holds user info like 'username'
        .select('username') // Select the 'username' column
        .eq('id', otherParticipantId.value)
        .single();

      if (userError && userError.code !== 'PGRST116') { // PGRST116 is 'No rows found', which is fine if user is deleted or not found
        console.warn('Error fetching other participant username from profiles:', userError.message);
      }
      otherParticipantUsername.value = otherUser?.username || 'Unknown User';
    }

    // 3. Fetch listing title if applicable
    if (listingId.value) {
      const { data: fetchedListingData, error: listingError } = await supabase
        .from('skills') // Assuming 'listings' table in original was 'skills' based on previous context
        .select('skill_name') // Assuming 'title' column is actually 'skill_name'
        .eq('id', listingId.value)
        .single();

      if (listingError && listingError.code !== 'PGRST116') {
        console.warn('Error fetching listing title:', listingError.message);
      }
      listingTitle.value = fetchedListingData?.skill_name || 'Unknown Listing';
    }

    // Mark messages as read for the current user
    if (messages.value.length > 0) {
      const unreadReceivedMessages = messages.value.filter(msg =>
        msg.receiver_id === user.value.id && !msg.is_read
      );
      if (unreadReceivedMessages.length > 0) {
        const idsToMarkRead = unreadReceivedMessages.map(msg => msg.id);
        const { error: updateError } = await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', idsToMarkRead);

        if (updateError) console.error('Error marking messages as read:', updateError.message);
        unreadReceivedMessages.forEach(msg => { msg.is_read = true; });
      }
    }

    await nextTick(() => {
      scrollToBottom();
    });

  } catch (error) {
    console.error('Error fetching conversation details:', error);
    messagesErrorMsg.value = 'Failed to load chat: ' + error.message;
  } finally {
    loadingMessages.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !user.value || !otherParticipantId.value || !conversationId.value) {
    alert('Cannot send message: Missing essential information.');
    return;
  }

  sendingMessage.value = true;
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId.value,
        sender_id: user.value.id,
        receiver_id: otherParticipantId.value,
        listing_id: listingId.value,
        message_text: newMessageText.value.trim(),
        is_read: false,
      });

    if (error) throw error;

    newMessageText.value = '';
    await nextTick(() => {
      scrollToBottom();
    });

  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message: ' + error.message);
  } finally {
    sendingMessage.value = false;
  }
};

const scrollToBottom = () => {
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' }); // Use block: 'end' for consistent scrolling
  }
};

const setupRealtimeSubscription = () => {
  if (messageSubscription) {
    supabase.removeChannel(messageSubscription);
  }

  messageSubscription = supabase.channel(`conversation:${conversationId.value}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId.value}`
    }, payload => {
      messages.value.push(payload.new);
      if (payload.new.receiver_id === user.value.id && !payload.new.is_read) {
        supabase.from('messages').update({ is_read: true }).eq('id', payload.new.id).then(({ error }) => {
          if (error) console.error('Error marking new message from Realtime as read:', error.message);
          else payload.new.is_read = true;
        });
      }
      nextTick(() => {
        scrollToBottom();
      });
    })
    .subscribe();
};

onMounted(() => {
  if (user.value && route.params.id) {
    fetchMessagesAndDetails();
    setupRealtimeSubscription();
  } else if (!user.value) {
    // The watch handler for 'user' will redirect if not logged in.
  }
});

onUnmounted(() => {
  if (messageSubscription) {
    supabase.removeChannel(messageSubscription);
  }
});

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    fetchMessagesAndDetails();
    setupRealtimeSubscription();
  }
});

// Watch messages ref to automatically scroll on new message (fallback, Realtime usually handles)
watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });
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

/* Custom scrollbar from default layout or global CSS */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #14b8a6;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #2dd4bf;
}
</style>