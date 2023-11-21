
<template>

    <div class="my-4">
        <div v-for="p in progress" :key ="p.id">
            <h4 class="small font-weight-bold">{{ p.name }}<span class="float-right"> Capsulas; {{ p.quantity }}</span> </h4>
            <div class="progress mb-4">
                <div
                    :class="{
                    'bg-danger' : p.quantity <= 20,
                     'bg-warning' : p.quantity > 20 &&  p.quantity <= 50 ,
                      'bg-success' : p.quantity > 50  }"
                    class="progress-bar" role="progressbar" :style=" {width: p.quantity + '%'}  " aria-valuenow="bg-success" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['progress','name'],
    data() {
        return {

           // progress:[],

        }
    },
    methods: {
        getComplements(){
           // this.$emit('getComplements', this.billing_data.person_type_id)
          this.$emit('getProgress')
        }
    },
    mounted() {
        console.log(name,'name v')

    },
}
</script>
