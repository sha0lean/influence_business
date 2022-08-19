export function setRole(userRole) {
    localStorage.setItem('role', JSON.stringify(userRole));
}
  
export function getRole() {
    const role = JSON.parse(localStorage.getItem('role'));
    return role
}

export function removeRole() {
    localStorage.removeItem('role');
}
