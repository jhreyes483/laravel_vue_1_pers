function can(permission, opciones={superAdmin:"SUPER_ADMIN"}) {
    let permissionsUser = (JSON.parse(localStorage.getItem('permissions'))) ? JSON.parse(localStorage.getItem('permissions')) : []//consultar los permisos del localStorage
    let rolesUser = (JSON.parse(localStorage.getItem('roles'))) ? JSON.parse(localStorage.getItem('roles')) : [] //consultar los roles del localStorage
    let count = 0
    let superAdmin = opciones.superAdmin /// Role que no necesita la validación de los permisos, ya que es el rol con todos los permisos por defecto
    let countRole = 0
    rolesUser.map(item => {
        if (item == superAdmin) {            
            countRole++
        }
    })


    
    // console.log(countRole);
    
    if (countRole == 0) { // Si no es superAdmin
        permissionsUser.map((per) => {
            if (per.name == permission) {
                count++
            }
        })
        if (count > 0) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}


function existToken(){
    let token = localStorage.getItem('access_token')
    if (token) {
        return true
    }
    return false
}

function beforeEnter(to, from, next,permission) {
    setKey(replaceString(to.name))
    if (can(permission)) { // si, tiene el permiso
        next(true) //Sigue adelante e ingresa a la vista
    } else {// no tiene el permiso
        if(from.name){ // Validamos si viene de una ruta vue
            next(from.name)// Lo dejamos en la misma ruta ya que no puede acceder a la ruta solicitada
        }else{
            next('/gateway')// Lo redireccionamos al dashboar ya que no puede acceder a nuestra ruta protegida
        }

    }
}


function setKey(data, key = 'modules_permissions'){
    let resp = localStorage.getItem(key)
    let obj = JSON.parse(JSON.stringify(eval("(" + `{${data}:[]}` + ")")))  
    if(resp){
        resp = JSON.parse(resp)
        if(!resp.find(el => Object.keys(el)[0] == data)){
            resp.push(obj)
            localStorage.setItem(key, JSON.stringify(resp))
        }
    }else{
        localStorage.setItem(key, JSON.stringify([obj]))
    }
}

function replaceString(str){
    if(str){
        return str.replaceAll('-', '_')
    }
    return str
}


export {can, existToken,beforeEnter, replaceString}