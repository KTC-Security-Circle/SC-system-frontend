import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Image
          src="/not-found.png"
          alt="Not Found"
          width={480}
          height={480}
        />
        <Typography variant="h6" gutterBottom>
          Could not find requested resource
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/">
          Return Home
        </Button>
      </Box>
    </Container>
  );
}