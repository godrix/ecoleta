/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FiArrowDownLeft } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";

import Dropzone from "../../components/Dropzone";
import api from "../../services/api";
import app from "../../constants/app";
import assets from "../../constants/assets";
import { Container } from "./styles";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

interface UF {
  initials: string;
  name: string;
}

interface UFIBGEResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface CityIBGEResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<UF[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectededImage, setSelectededImage] = useState<File>();
  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
      setSelectedPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/items");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    axios
      .get<UFIBGEResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufsData = response.data.map((uf) => {
          return { initials: uf.sigla, name: uf.nome };
        });
        setUfs(ufsData);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<CityIBGEResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>): void {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>): void {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapLocation(event: LeafletMouseEvent): void {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSelecedItem(id: number): void {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", selectedItems.join(","));
    if (selectededImage) {
      data.append("image", selectededImage);
    }

    try {
      await api.post("points", data);
      history.push("/");
    } catch (error) {}
  }

  return (
    <Container>
      <header>
        <img src={assets.logo} alt={app.app_name} />
        <Link to="/">
          <FiArrowDownLeft />
          Voltar para Home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro do ponto de coleta</h1>
        <Dropzone onFileUploaded={setSelectededImage} />
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Nome da Entidade</label>
              <input
                type="number"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Map center={initialPosition} zoom={15} onclick={handleMapLocation}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf: UF) => (
                  <option value={uf.initials} key={uf.initials}>
                    {uf.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectedCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map((city: string) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: Item) => (
              <li
                key={item.id}
                onClick={() => handleSelecedItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.imageUrl} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
};

export default CreatePoint;
