<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <!-- llamamos al logo de Vue -->
                    <!--
                      <img src="https://vuejs.org/images/logo.svg" alt="" width="30" height="24">
                     -->

                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <img class="avatar_mask" alt="Alegra"
                                src="https://www.offshorebusinessprocessing.com/images/icon-services-it-lightblue.svg">
                        </li>

                        <li class="nav-item mt-2" v-if="checkToken">
                            <router-link active-class="active" to="/" class="nav-link active"
                                aria-current="page">Inicio</router-link>
                        </li>
                        <!-- 
                        <li class="nav-item" v-if="checkToken">
                            <router-link active-class="active" to="/blogs" class="nav-link">Blogs</router-link>
                        </li>
                        <li class="nav-item" v-if="checkToken">
                            <router-link active-class="active" to="/contacto" class="nav-link">Contacto</router-link>
                        </li>
                         -->
                        <li class="nav-item mb-2" v-if="checkToken">
                            <router-link active-class="active" to="/control_usuarios" class="nav-link mt-2">Control de
                                usuarios</router-link>
                        </li>
                        <li class="nav-item mb-2" v-if="checkToken">
                            <router-link active-class="active" to="/medicacion" class="nav-link mt-2">Home</router-link>
                        </li>
                    </ul>

                    <ul v-if="identity && checkToken" class="navbar-nav mb-2 mb-lg-0 float-end">
                        <li class="nav-item">
                            <router-link exact-active-class="active" to="/" class="nav-link active"
                                aria-current="page">{{
                                    identity.name }}</router-link>
                        </li>
                    </ul>
                    <ul v-if="checkToken" class="navbar-nav mb-2 mb-lg-0 float-end">
                        <li class="nav-item">
                            <div @click="logout()" style="  cursor: pointer;" class="nav-link">Cerrar sesión</div>
                        </li>
                        <li v-if="!checkToken" class="nav-item">
                            <router-link active-class="active" to="/login" class="nav-link">Login</router-link>
                        </li>
                    </ul>



                </div>
            </div>
        </nav>
        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
import { user_auth } from '../utils/services/auth.js'
import { existToken } from '../utils/functions/auth.js'
export default {
    data() {
        return {
            identity: null,
            checkToken: existToken()
        }
    },
    watch: {
        '$route': function () {
            this.checkToken = existToken();
        },
    },

    methods: {
        logout() {
            localStorage.removeItem('access_token');
            alert('cerror sesión');
            return this.$route.path === '/';
        },
    },
    components: {},
    mounted() {
        this.identity = user_auth.getIdentity()
    },



}
</script>


<style>
.avatar_mask {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
    margin-right: 6px;
    box-shadow: 12px;
    animation: palpitar infinite 1s linear;
}

@keyframes palpitar {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>