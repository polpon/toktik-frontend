<script>
import axios from 'axios';
export default {
    name: 'test',
    data: () => ({
        errormsg: ""
    }),
    methods: {
        submitForm() {
            let form = new FormData(this.$refs.accountForm);
            const test = {filename: "test.mp4",filetype: "video/mp4"}
            axios.post("/test", test)
                // .then((res) => {
                //     let data = res.data
                //     console.log(data)
                //     if(data.success) {
                //         this.$router.push({ name: 'manage-accounts' });
                //     }
                // })
                // .catch((error) => {
                //     this.errormsg = "Something happen please try again"
                // });
        }
    },
    beforeMount() {
        this.submitForm()
    },

}
</script>

<style scoped>

</style>
