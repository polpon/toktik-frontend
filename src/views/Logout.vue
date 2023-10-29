<script>
import axios from 'axios';

export default {
    beforeMount() {
      axios.delete("/logout")
      this.$router.push({ name: 'login' })
    }
}
</script>