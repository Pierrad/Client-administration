// Check les routes pour lesquelles on autorise l'accès
const allowedRoutes = ['/', '/users'];
exports.allowedRoutesCheck = (route) => {
    let endpoint = route.originalUrl.split('/')
    if (allowedRoutes.indexOf('/'+endpoint[1]) > -1) {
        return true
    }
    return false
}

// On définit la force du mot de passe
exports.passwordDefaultOptions = [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 6
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10
    }
]