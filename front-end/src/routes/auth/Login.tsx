import React, { useState } from 'react';
import { pb } from '../../store/pb';
import { useNavigate } from 'react-router-dom';
const MyForm: React.FC = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Handle the form submission
        console.log('Form submitted with data:', formData);

        // Additional logic can be added here
        const authData = await pb.collection('users').authWithPassword(
            formData.username,
            formData.password,
        );
        if (authData.record) {
            navigate("/")
        }
        // Reset the form or perform other actions if needed
        setFormData({
            username: '',
            password: '',
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>

    );
};

export default MyForm;
