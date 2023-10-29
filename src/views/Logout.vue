<script>
import axios from 'axios';

export default {
    beforeMount() {
      axios.delete("/logout")
      console.log("TEST")
      this.$router.push({ name: 'login' })
    }
}
</script>