<template>

    <div class="my-4 col-md-11 mx-auto card card-body  shadow border">
        <div v-for="p in props" :key ="p.id" class="row col-lg-10 mx-auto">
            <label class="my-2">{{ p.title }}</label>
            <div class=" col-md-3  mx-auto card card-body shadow ">
                <div class="form-group  col-lg-10 row">
                    <label class="col-sm-9" for="">días</label>
                    <input class="form-control col-sm-3" type="text" :value=" roundNumber(p.days)" disabled="">
                </div>
            </div>
            <div class=" col-md-3  mx-auto card card-body shadow">
                <div class="form-group  col-lg-10 row">
                    <label class="col-sm-9" for="">Meses</label>
                    <input class="form-control col-sm-3" type="text" :value="roundNumber(p.mounts)" disabled="">
                </div>
            </div>
            <div class=" col-md-3  mx-auto card card-body shadow">
                <div class="form-group  col-lg-10 row">
                    <label class="col-sm-9" for="">Semanas</label>
                    <input class="form-control col-sm-3" type="text" :value="roundNumber(p.semanas)" disabled="">
                </div>
            </div>
            <div class=" col-md-3  mx-auto card card-body shadow">
                <div class="form-group  col-lg-10 row">
                    <label class="col-sm-9" for="">Años</label>
                    <input class="form-control col-sm-3" type="text" :value="roundNumber(p.years)" disabled="">
                </div>
            </div>
        </div>
    </div>

</template>


<script>
export default {
    props: ['props'],
    data() {
        return {
        }
    },
    methods: {
        roundNumber(value) {
      if (typeof value === "number") {
        return value.toFixed(1);
      }
      return parseFloat(value);
    }
    },
    mounted() {
    },
    
}
</script>
