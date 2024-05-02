import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Search component for filtering activities.
 *
 * @param {string} searchTerm The current search term.
 * @param {Function} handler Function to handle changes in the search input.
 * @returns The search component with an input field and search icon.
 */
const Search = ({ searchTerm, handler }) => {
  // Handles input changes and calls the handler prop function with new value
  const onChange = (event) => handler(event.target.value);

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: { xs: 300, md: 400 }
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          value={searchTerm}
          onChange={onChange}
        />
        <SearchIcon />
      </Paper>
    </div>
  );
};

export default Search;
