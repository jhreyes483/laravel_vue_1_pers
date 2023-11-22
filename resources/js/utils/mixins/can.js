import { can } from "../functions/auth"
import { updatedPermission, sendPermissionApi, verifiedSavePermissionApi } from "../services/permission"

let p = {
    methods: {
        can(permissions, exclude = false){
            let result = []
            if (permissions["permissions"]) {
                let rolesUser = (JSON.parse(localStorage.getItem('roles'))) ? JSON.parse(localStorage.getItem('roles')) : []
                let user = JSON.parse(localStorage.getItem("user"))
                if (rolesUser.find(r => r == "SUPER_ADMIN") && (user && user.email == "jav--outlook.com")) {
                    if (!verifiedSavePermissionApi(permissions.permissions[0])) {
                        // updatedPermission(permissions).then(resp => {
                        //     console.log('==================updatedPermission==================');
                        //     console.log(resp, permissions);
                        //     console.log('=================permissions===================');
                        //     sendPermissionApi(permissions[0])
                        // }).catch(error => {
                        //     console.log('==================error==================');
                        //     console.log(error);
                        //     console.log('====================================');
                        // })
                    }
                }
                // Para que siga en funcionamiento lo anteriror
                permissions = permissions["permissions"] 
            }
            permissions.map(per => {
                result.push(can(per))
            })
            if (result.filter(item => item == true).length > 0) {
                return true
            }
        }
    }
}


export default p