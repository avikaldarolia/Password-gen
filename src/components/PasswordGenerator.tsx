import { useState } from "react";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import "../styles/password.css";

export interface CheckBox {
	title: string;
	state: boolean;
}

const PasswordGenerator = () => {
	const [passLength, setPassLength] = useState(4);
	const [copy, setCopy] = useState(false);
	const [checkboxData, setCheckboxData] = useState<CheckBox[]>([
		{ title: "Include Uppercase Letters", state: false },
		{ title: "Include Lowercase Letters", state: false },
		{ title: "Include Numbers", state: false },
		{ title: "Include Symbols", state: false },
	]);

	const { password, errorMessage, generatePassword } = usePasswordGenerator();

	const handleCheckBoxChange = (i: number) => {
		const updatedState = [...checkboxData];
		console.log(i, updatedState[i]);
		updatedState[i].state = !updatedState[i].state;
		setCheckboxData(updatedState);
	};

	const handleCopy = async () => {
		setCopy(true);
		await navigator.clipboard.writeText(password);
		setTimeout(() => {
			setCopy(false);
		}, 1000);
	};

	return (
		<div className="container">
			<div className="card">
				{password && (
					<div className="flex-tile">
						<span className="password">{password}</span>
						<button onClick={handleCopy} className="copy-button">
							{copy ? "Copied" : "Copy"}
						</button>
					</div>
				)}
				<div className="length-box">
					<div className="flex-tile length-title">
						<p className="">Character Length</p>
						<p className="left-value">{passLength}</p>
					</div>
					<input
						min={4}
						max={20}
						className="length-range"
						type="range"
						name="charLength"
						id="charLength"
						value={passLength}
						onChange={(e) => setPassLength(parseInt(e.target.value))}
					/>
				</div>
				<div className="option-grid">
					{checkboxData.map((checkbox, index) => (
						<div key={index} className="option-tile">
							<input
								type="checkbox"
								checked={checkbox.state}
								onChange={() => handleCheckBoxChange(index)}
							/>
							<label>{checkbox.title}</label>
						</div>
					))}
				</div>
				{errorMessage && <div>{errorMessage}</div>}
				<div className="strength">
					<p>Strength</p>
					<p className="left-value">Medium</p>
				</div>
				<button
					className="generate-button"
					onClick={() => generatePassword(checkboxData, passLength)}>
					GENERATE PASSWORD
				</button>
			</div>
		</div>
	);
};

export default PasswordGenerator;
