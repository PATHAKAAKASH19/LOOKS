

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = passwordRegex.test(password);

  return validatePassword
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = emailRegex.test(email);

  
    return validateEmail
  
};

export const validateRole = (role) => {
  console.log(role)
  if(role === "admin"){
   return true
  }else{
    return false
  }
}
