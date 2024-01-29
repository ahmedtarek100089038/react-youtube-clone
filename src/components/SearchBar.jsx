import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, styled, useTheme } from '@mui/material';
import Search from '@mui/icons-material/Search';

const SearchBar = () => {
  const theme = useTheme();
  const StyledSearchIcon = styled(Search)({
    fontSize: '24px',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid hsl(0,0%,18.82%)',
        pl: 2,
        boxShadow: 'none',
        mr: { xs: 2, sm: 5 }, 
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          background: 'transparent',
          color: 'white',
          border: 'none',
          outline: 'none',
          flex: '1',
          padding: '10px',
        }}
      />

      <IconButton
        type="submit"
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
        aria-label="search"
      >
        <StyledSearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
