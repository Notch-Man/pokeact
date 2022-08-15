import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import Search from "./components/Search";

import axios from "axios";

function App() {
  const [q, setQ] = useState("");
  const [p, setP] = useState([]);

  useEffect(() => {
    const getPokes = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=905"
      );
      // console.log(res.data.results);
      const pokemonDataWithIds = res.data.results.map((pokemon, index) => {
        return {
          ...pokemon,
          id: index + 1,
        };
      });

      setP(pokemonDataWithIds);
    };
    getPokes();

    return () => {};
  }, []);

  return (
    <>
      <Header />
      <Search q={q} setQ={setQ} />
      <Container
        fluid
        className="d-flex justify-content-center flex-wrap my-5"
        style={{ gap: "15px" }}
      >
        {p.map((poke) => {
          if (poke.name.includes(q.toLowerCase())) {
            return (
              <PokeCard
                key={poke.id - 1}
                pokemon={poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                id={poke.id}
                sprite={`https://img.pokemondb.net/sprites/home/normal/2x/${poke.name}.jpg`}
              />
            );
          }
        })}
      </Container>
    </>
  );
}

export default App;
