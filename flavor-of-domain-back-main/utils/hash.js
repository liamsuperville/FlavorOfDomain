import bcrypt from 'bcrypt'

const saltRounds = 10 // the cost factor

export async function hashPassword(plainPassword) {
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
    console.log(hashedPassword)
	return hashedPassword
}

export async function comparePasswords(plainPassword, hashedPassword) {
	const match = await bcrypt.compare(plainPassword, hashedPassword)
	return match
}
