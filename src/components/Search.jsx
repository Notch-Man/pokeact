import React, { useState } from "react";
import { Container, FormControl } from "react-bootstrap";

const Search = ({ q, setQ }) => {
  return (
    <Container>
      <FormControl
        value={q}
        placeholder="Enter Pokemon here..."
        onChange={(e) => setQ(e.target.value)}
      />
    </Container>
  );
};

export default Search;
