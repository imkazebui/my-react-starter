import React from 'react';
import { FormGroup, Label, Input, Row } from 'reactstrap';

import styles from './styles.scss';

const ImageInput = ({ image, label, onChange, isDisabled = false }) => {
	if (!image) {
		return (
			<FormGroup id="choose-image">
				<Label htmlFor={label}>
					<p>Chọn hình ảnh để upload</p>
				</Label>
				<Input
					required
					type="file"
					name={label}
					id={label}
					accept=".jpg, .jpeg, .png"
					onChange={onChange}
				/>
			</FormGroup>
		);
	}
	return (
		<FormGroup id="image-input">
			<Label htmlFor={label}>
				<img src={image} alt="tb-image-input" />
			</Label>
 			<Input disabled={isDisabled} type="file" name={label} id={label} accept=".jpg, .jpeg, .png" onChange={onChange} />
		</FormGroup>
	);
};

export default ImageInput;

export const AvatarInput = ({ image, label, onChange, isDisabled = false }) => {
	return (
		<React.Fragment>
			<Label htmlFor={label}>
				<img src={image} alt="tb-image-input" />
			</Label>
			<Input
				type="file"
				name={label}
				id={label}
				accept=".jpg, .jpeg, .png"
				onChange={onChange}
				disabled={isDisabled}
			/>
		</React.Fragment>
	);
};
