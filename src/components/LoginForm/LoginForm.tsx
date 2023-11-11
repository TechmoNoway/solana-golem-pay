import { useState } from 'react';

import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../Iconify/Iconify';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        router.push('/');
    };

    return (
        <>
            <div>
                <Stack spacing={3}>
                    <TextField name="email" label="Email address" />

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify
                                            icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                            height={10}
                                            color={''}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                    Login
                </LoadingButton>
            </div>
        </>
    );
}
