const Home = () => import('./components/Home.vue')
const Contacto = () => import('./components/Contacto.vue')

const Medica = () => import('./components/Medicacion/Medicacion.vue')

//importamos los componentes para el blog
const Mostrar = () => import('./components/blog/Mostrar.vue')
const Crear = () => import('./components/blog/Crear.vue')
const Editar = () => import('./components/blog/Editar.vue')
const LoginAuth = () => import('./components/auth/Auth.vue')
//const Login = () => import('./components/auth/Login')


/***** permisos ****** */
const ControlUsers = () => import('./components/permissions/View.vue')
const DetailUser = () => import('./components/permissions/DetailUser.vue');
const DetailRole = () => import('./components/permissions/DetailRole.vue');

const Test = () => import('./components/Test.vue')
const AppNotAuthorized = () => import('./components/auth/AppNotAuthorized.vue')

//auth functions
import {
    can,
    existToken,
    beforeEnter
} from './utils/functions/auth'

//--------------------------------------------

// routes
export const routes = [
    {
        name: 'login',
        path: '/',
        component: LoginAuth,
       
    },
    {
        name:'login2',
        path: '/login',
        component: LoginAuth,

    },
    {
        name: 'mostrarBlogs',
        path: '/blogs',
        component: Mostrar,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_bulk_load_lc'),
        meta: { requiresAuth: true }
    },
    {
        name: 'crearBlog',
        path: '/crear',
        component: Crear,
      //  beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        name: 'editarBlog',
        path: '/editar/:id',
        component: Editar,
        meta: { requiresAuth: true }
      //  beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
     {
        name: 'contacto',
        path: '/contacto',
        component: Contacto,
        meta: { requiresAuth: true }
       // beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        name: 'medicacion',
        path: '/medicacion',
        component: Medica,
        meta: { requiresAuth: true }
       // beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        name: 'test',
        path: '/test',
        component: Test
    },
    {
        name: 'control_usuarios',
        path: '/control_usuarios',
        component: ControlUsers, // user.control
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'user.control'),
        meta: { requiresAuth: true }
    },
    {
        name: 'permisos-detail',
        path: '/usuario/permisos-detail/:id',
        component: DetailUser,
        meta: { requiresAuth: true }
    },
    {
        name: 'role-detail',
        path: '/usuario/role-detail/:id',
        component: DetailRole,
        meta: { requiresAuth: true }
    },
    {
        name: 'no_autorizado',
        path: '/no_autorizado',
        component: AppNotAuthorized,
        meta: { requiresAuth: true }
    }


    
]
