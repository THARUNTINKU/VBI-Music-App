import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchBox = ({ searchBoxChange, searchBoxText }) => {
    return (
        <div style={{ width: '100%' }}>
            <InputGroup className='mb-3'>
                <FormControl
                    type='text'
                    className='form-control'
                    name='searchBox'
                    placeholder='Search by song title...'
                    id='searchBox'
                    autoFocus=''
                    onChange={(e) => searchBoxChange(e.target.value)}
                    required
                    autoComplete='off'
                    value={searchBoxText}
                />
                {/* <div className='search-icon'>
                    <i className='fas fa-search mr-1' />
                </div> */}
            </InputGroup>
        </div>
    );
};

export default SearchBox;
