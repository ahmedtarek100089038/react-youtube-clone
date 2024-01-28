import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, styled } from '@mui/material';
import Search from '@mui/icons-material/Search';

const SearchBar = () => {
    const StyledSearchIcon = styled(Search)({
        fontSize: "24px",
    });

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const onhandleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            navigate(`/search/${searchTerm}`);

            setSearchTerm('');
        }
    };


    return (
        <Paper component="form" onSubmit={onhandleSubmit}
            sx={{
                borderRadius: 20,
                border: '1px solid hsl(0,0%,18.82%)',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 },
                background: 'transparent',
            }}>
            <input
                className='search-bar'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', color: 'white' }}
            />

            <IconButton type='submit'
                sx={{
                    borderRadius: '0 40px 40px 0',
                    cursor: 'pointer',
                    height: '40px',
                    width: '64px',
                    margin: '0',
                    background: 'hsla(0,0%,100%,0.08)',
                    p: '10px',
                    color: '#f1f1f1',
                    '&:hover': { backgroundColor: 'hsla(0,0%,100%,0.08)' },
                }}
                aria-label='search'>
                <StyledSearchIcon />
            </IconButton>

        </Paper>
    )
}

export default SearchBar;