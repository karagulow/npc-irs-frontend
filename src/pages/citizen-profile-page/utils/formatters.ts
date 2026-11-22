export const formatDate = (date: string) =>
	new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU');

export const getAge = (birthDate: string) => {
	const birth = new Date(`${birthDate}T00:00:00`);
	const today = new Date();

	let age = today.getFullYear() - birth.getFullYear();

	const hasBirthdayPassed =
		today.getMonth() > birth.getMonth() ||
		(today.getMonth() === birth.getMonth() &&
			today.getDate() >= birth.getDate());

	if (!hasBirthdayPassed) age--;

	return age;
};
