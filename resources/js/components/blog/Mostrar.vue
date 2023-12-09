<template>
<h1>Blog</h1>
</template>

<script>
export default {
    name:"blogs",
    data(){
        return {
            blogs:[]
        }
    },
    mounted(){
        this.mostrarBlogs()
    },
    methods:{
        async mostrarBlogs(){
            await this.axios.get('/api/blog').then(response=>{
                this.blogs = response.data
            }).catch(error=>{
                console.log(error)
                this.blogs = []
            })
        },
        borrarBlog(id){
            if(confirm("¿Confirma eliminar el registro?")){
                this.axios.delete(`/api/blog/${id}`).then(response=>{
                    this.mostrarBlogs()
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }
}
</script>