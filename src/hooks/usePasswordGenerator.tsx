import { useState } from "react";
import { CheckBox } from "../components/PasswordGenerator";

const usePasswordGenerator = () => {
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const generatePassword = (checkboxData: CheckBox[], length: number) => {
		let characterSet = "",
			generatedPassword = "";

		const selectedOptions = checkboxData.filter((checkbox) => checkbox.state);

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
			console.log("here");
			const randomIndex = Math.floor(Math.random() * characterSet.length);
			generatedPassword += characterSet[randomIndex];
		}

		setPassword(generatedPassword);
		setErrorMessage("");
	};

	return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
