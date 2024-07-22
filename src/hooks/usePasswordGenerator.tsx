import { useState } from "react";
import { CheckBox } from "../components/PasswordGenerator";

export enum StrengthType {
	Weak = "Weak",
	Medium = "Medium",
	Strong = "Strong",
}

const usePasswordGenerator = () => {
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [strength, setStrength] = useState<StrengthType>(StrengthType.Weak);

	const calculateStrength = (passwordLength: number, checkedCount: number) => {
		console.log("passLength: ", passwordLength);
		console.log("count: ", checkedCount);

		if (checkedCount >= 3 && passwordLength >= 8) {
			console.log("Strong");
			setStrength(StrengthType.Strong);
		} else if (checkedCount >= 2 && passwordLength >= 8) {
			console.log("Med");
			setStrength(StrengthType.Medium);
		} else {
			console.log("Weak");
			setStrength(StrengthType.Weak);
		}
	};

	const generatePassword = (checkboxData: CheckBox[], length: number) => {
		let characterSet = "",
			generatedPassword = "";

		const selectedOptions = checkboxData.filter((checkbox) => checkbox.state);
		const checkedCount = selectedOptions.length;

		if (selectedOptions.length === 0) {
			setPassword("");
			setErrorMessage("Select atleast one option.");
			return;
		}

		selectedOptions.forEach((op) => {
			switch (op.title) {
				case "Include Uppercase Letters":
					characterSet += "QWERTYUIOPLKJHGFDSAZXCVBNM";
					break;
				case "Include Lowercase Letters":
					characterSet += "qwertyuioplkjhgfdsazxcvbnm";
					break;
				case "Include Numbers":
					characterSet += "1234567890";
					break;
				case "Include Symbols":
					characterSet += "!@#$%^&*()";
					break;
				default:
					break;
			}
		});

		// fill the generated Password
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characterSet.length);
			generatedPassword += characterSet[randomIndex];
		}

		setPassword(generatedPassword);
		setErrorMessage("");
		calculateStrength(generatedPassword.length, checkedCount);
	};

	const resetPassword = () => {
		setPassword("");
		setErrorMessage("");
		setStrength(StrengthType.Weak);
	};

	return { password, errorMessage, strength, generatePassword, resetPassword };
};

export default usePasswordGenerator;
