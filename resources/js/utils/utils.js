export function verificarPermiso(permisoBuscado) {
    const permisosGuardados = JSON.parse(localStorage.getItem('permissions')) || [];
    return permisosGuardados.includes(permisoBuscado);
}