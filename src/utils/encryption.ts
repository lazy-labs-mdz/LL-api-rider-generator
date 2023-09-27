import * as bcrypt from 'bcrypt';
 
export const hashPassword = async (password) => {
  const saltRounds = 15;
  return await bcrypt.hash(password, saltRounds);
}

export const validatePassword = async (password, hashedPassword) => {
  console.log('hashedPassword', hashedPassword)
  console.log('password', password)
  console.log('bcrypt.compare(password, hashedPassword)', await bcrypt.compare(password, hashedPassword))
  return await bcrypt.compare(password, hashedPassword);
}