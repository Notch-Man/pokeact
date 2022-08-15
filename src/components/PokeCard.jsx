import React, { useState, useEffect } from "react";
import { Card, Modal, Button, Badge } from "react-bootstrap";
import axios from "axios";

const PokeCard = ({ sprite, pokemon, id }) => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
      .then((res) =>
        setInfo([
          {
            abilities: res.data.abilities.map((ability) => {
              return (
                ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)
              );
            }),
            weight: res.data.weight,
            types: res.data.types.map((type) => {
              return (
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
              );
            }),
            id: res.data.id,
          },
        ])
      );
    // console.log(info);
  };

  return (
    <>
      <Card style={{ width: "20rem" }} onClick={handleShow}>
        <Card.Img
          src={sprite}
          style={{ width: "256px" }}
          className="rounded mx-auto d-block"
        />
        <Card.Body className="text-center">
          <Card.Title className="display-6">{pokemon}</Card.Title>
          <Card.Body class="text-muted ">#{id}</Card.Body>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="pokemon-stats-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{pokemon} Info</Modal.Title>
        </Modal.Header>
        <Modal.Body class="text-center mb-3">
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/2x/${pokemon.toLowerCase()}.jpg`}
            className="rounded mx-auto d-block"
            style={{ width: "256px" }}
          />
          <h5 class="lead">#{info[0]?.id}</h5>
          <h5 class="fwt-semibold">{info[0]?.abilities.join(" • ")}</h5>
          {info[0]?.types.map((type, idx) => {
            if (idx === info[0].types.length - 1) {
              return (
                <span className={`lead ${type.toLowerCase()}`}>{type}</span>
              );
            } else {
              return (
                <span>
                  <span className={`lead ${type.toLowerCase()}`}>{type} </span>
                  <span> • </span>
                </span>
              );
            }
          })}
          <br />
          <br />
          <Button
            variant="outline-success"
            target="_blank"
            href={`https://pokemondb.net/pokedex/${pokemon.toLowerCase()}`}
          >
            More Info
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PokeCard;
