<template>
    <div class="container-fluid">
        <div class="col-md-6 mx-auto card card-body">
            <div class="card-title">Sistema personal de control By: dev-jav</div>
            <form class="kt-form" @submit.prevent="authLogin()" method="post">

                <div class="row justify-content-center">
                    <!--  
                         <p class="text-danger" v-for="(item, index) in error_messages" :key="index">{{ item }}</p>
                    -->
                   
                </div>
                <div class="form-group">
                    <input name="email" required v-model.trim="login.email" class="form-control" type="text"
                        placeholder="Correo electrónico." autocomplete="off">
                </div>
                <div class="form-group">
                    <input v-model.trim="login.password" name="password" type="password"
                        class="form-control form-control-last" required placeholder="Contraseña.">
                </div>
                <div class="text-right ml-2 mr-2 mt-1">
                    <span @click="openModal('#forget_pass')" class="forget_pass">¿Olvidó su contraseña?</span>

                </div>

                <div class="kt-login__actions">
                    <button type="submit"
                        class="btn btn-primary kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light">Ingresar</button>


                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            emailRegex: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        authLogin() {
            //this.preload = true
            var data = {
                email: this.login.email,
                //  password:sha1(this.login.password)
                password: this.login.password
            }
            axios.post('api/v1/auth/login', data).then(res => { 
                //this.preload = false

                if (res.data.status == 'success') {
                    let token       = res.data.authorisation.token;
                    let identity    = res.data.user;
                    let permissions = res.data.user.permissions_user_and_rol;           
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('identity',JSON.stringify(identity));
                    localStorage.setItem('permissions', JSON.stringify(permissions));
                    this.$router.push('/medicacion');
                } else {
                    alert('Credeciales incorrectas');
                }
            })
        }
    }
}


</script>