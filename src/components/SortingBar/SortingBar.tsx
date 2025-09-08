import { Button, Box } from '@mui/material';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useSearchParams } from 'react-router';

export const SortingBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (thing: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      switch (thing) {
        case 'price': {
          newParams.set('sortBy', thing);
          break;
        }
        case 'date': {
          newParams.set('sortBy', thing);
          break;
        }
        default: {
          newParams.set(
            'sortOrder',
            prev.get('sortOrder') === 'asc' ? 'desc' : 'asc'
          );
          break;
        }
      }
      return newParams;
    });
  };
  return (
    <Container>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" onClick={() => handleClick('price')}>
            Sort by price
          </Button>
          <Button color="inherit" onClick={() => handleClick('date')}>
            Sort by date added
          </Button>
          <Button color="inherit" onClick={() => handleClick('order')}>
            {searchParams.get('sortOrder') === 'asc'
              ? 'Ascending'
              : 'Descending'}
          </Button>
        </Box>
      </Toolbar>
    </Container>
  );
};
