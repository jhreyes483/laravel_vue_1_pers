<template>
    <div class="container-fluid">
        <div class="col-md-6 mx-auto card-login card-body">
            <div class="text-center">
                <div class="card-title">Sistema personal de control By: dev-jav</div>
            </div>
            <form class="kt-form " @submit.prevent="authLogin()" method="post">

                <div class="row justify-content-center">
                    <!--  
                         <p class="text-danger" v-for="(item, index) in error_messages" :key="index">{{ item }}</p>
                    -->

                </div>
                <div class="form-group mt-4">
                    <input name="email" required v-model.trim="login.email" class="form-control" type="text"
                        placeholder="Correo electrónico." autocomplete="off">
                </div>
                <div class="form-group mt-4">
                    <input v-model.trim="login.password" name="password" type="password"
                        class="form-control form-control-last" required placeholder="Contraseña.">
                </div>
                <div class=" mt-2 text-center">
                    <br>
                    <button type="submit" data-color="120"
                        class="interactive-button btn btn-login ">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            emailRegex: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            login: {
                email: '',
                password: ''
            }
        }
    },

    mounted() {
        this.efectBotons();
        console.log('llego');
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
                    let token = res.data.authorisation.token;
                    let identity = res.data.user;
                    let permissions = res.data.user.permissions_user_and_rol;
                    let roles = res.data.user.role;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('identity', JSON.stringify(identity));
                    localStorage.setItem('permissions', JSON.stringify(permissions));
                    localStorage.setItem('roles', JSON.stringify(roles));
                    this.$router.push('/medicacion');
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'Credeciales incorrectas',
                        text: 'Intente de nuevo.',
                        confirmButtonText: 'OK'
                    })
                }
            })
        },
        efectBotons() {
            let buttons = document.querySelectorAll('.interactive-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function (e) {
                    const color = this.getAttribute('data-color');
                });

                button.addEventListener('mousemove', function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const gradientStart = Math.max(0, x * 100 - 10) + '%';
                    const gradientEnd = Math.min(100, x * 100 + 10) + '%';
                    const color = this.getAttribute('data-color');
                    this.style.color = `hsl(${color}, 100%, 50%)`;
                    this.style.borderRadius = '20px';
                    this.style.setProperty('--gradient', `linear-gradient(to right, black 0%, black ${gradientStart}, hsl(${color}, 100%, 50%) ${gradientStart}, hsl(${color}, 100%, 50%) ${gradientEnd}, black ${gradientEnd}, black 100%)`);
                    this.style.borderImage = `var(--gradient) 1`;
                });

                button.addEventListener('mouseleave', function () {
                    this.style.color = 'gray';
                    this.style.borderImage = 'none';
                    this.style.borderColor = 'black';
                });
            });
        }

    }
}


let buttons = document.querySelectorAll('.interactive-button');


</script>

<style>
.card-login {
    margin-top: 15px;
    padding: 100px;
    border-radius: 1em;
    border: solid 3px #30e0a5;
}

.btn-login {
    margin-top: 30px;
    border-radius: 1em;
    margin-top: 10px;
    padding-left: 30px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-right: 30px;
}


.interactive-button {
    position: relative;
    padding: 12px 50px;
    margin: 10px;
    color: gray;
    background-color: black;
    border: 4px solid black;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    transition: color 0.3s;
    border-radius: 20px;
    /* Redondez también para el border-image */
    --size: 0% 0%;
}

.interactive-button::after {
    content: '';
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    border-radius: 20px;
    background: hsl(var(--hue), 100%, 50%);
    z-index: -1;
    transition: background-size 0.3s, background-position 0.3s ease-out;
    background-repeat: no-repeat;
    pointer-events: none;
    background-size: var(--size, 0% 0%);
    background-position: var(--position, 0% 0);
}

.interactive-button:hover {
    border-image-slice: 1;
    /* Asegúrate de que esta propiedad se maneje adecuadamente para preservar el border-radius */
}
</style>
