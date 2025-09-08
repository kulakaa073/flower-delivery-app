import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

export const SortingBar = () => {
  return (
    <Container>
      <Toolbar>
        <p>Sort by price</p>
        <p>Sort by date added</p>
        <p>Ascending</p>
      </Toolbar>
    </Container>
  );
};
