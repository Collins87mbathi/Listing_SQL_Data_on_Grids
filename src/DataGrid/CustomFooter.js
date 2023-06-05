import {
    GridFooterContainer,
    GridFooter
  } from '@mui/x-data-grid-pro';
  import { Typography, TextField, Button } from '@mui/material';
  import { useState, useEffect } from 'react';

  
  function CustomFooter({ pagination, isMobile, tOpts, apiRef, page, disableJTP = false, data }) {
    const [pageNoInput, setPageNoInput] = useState(page + 1);
    const [refresh, setRefresh] = useState(1);
    const [editOn, setEditOn] = useState(false);
  
    useEffect(() => {
      setPageNoInput(page + 1);
    }, [refresh])
  
    const handleChange = (e) => {
      const { value } = e.target;
      const re = /^[0-9\b]+$/;
      if (!re.test(e.target.value) && value !== '') {
        e.preventDefault()
        return;
      }
      setPageNoInput(value < 0 ? 0 : value);
      setEditOn(true);
    }
  
    const handleKeyPress = (event) => {
      if (['e', 'E', '+', '-'].includes(event.key))
        event.preventDefault()
  
      if (event.key === 'Enter')
        changePage();
    }
  
    const changePage = () => {
      let newPage = pageNoInput - 1;
      if (data.length === 0) {
        newPage = 0
      }
      if (newPage < 0)
        newPage = 0;
      setPageNoInput(newPage);
      apiRef.current.setPage(newPage);
      setRefresh(refresh + 1);
      setEditOn(false);
    }
  
    return (
      <GridFooterContainer>
        <div className="jump-to-page-container">
          {/* Hide jump to page in case of mobile and when pagination is disabled */}
          {(pagination &&  <>
            <Typography className='grid-footer-text' variant="p">Jump to page:</Typography>
            <TextField
              size='small'
              className={`jump-to-page-input ${editOn ? 'jtp-border' : ''}`}
              variant="outlined"
              type='number'
              min={1}
              placeholder={page + 1}
              value={pageNoInput}
              onChange={handleChange}
              onKeyPress={handleKeyPress} />
            <Button size='small' onClick={changePage} className='jump-to-page-go'>Go</Button>
          </>)}
        </div>
        <GridFooter sx={{ border: 'none' }} />
      </GridFooterContainer>
    );
  }
  
  export default CustomFooter