<script>
import axios from 'axios';
import { socket } from "@/socket";

export default {
    async beforeMount() {
      await axios.delete("/logout")
      this.$router.push({ name: 'home' })

      let text = "getNewNotification";
      socket.off(text.concat(this.$store.state.username))
    }
}
</script>