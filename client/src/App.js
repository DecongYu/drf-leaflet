import axios from "axios";
import React, { useState } from "react";
import { Icon } from "leaflet";
import { Alert, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useSWR from "swr";
import "./App.css";

export const icon = new Icon({
	iconUrl: "leaf-red.png",
	shadowUrl: "leaf-shadow.png",
	iconSize: [30, 76],
	iconAnchor: [22, 94],
	shadowAnchor: [4, 62],
	popupAnchor: [-3, -76],
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const App = () => {
	const [activeSchool, setActiveSchool] = useState(null);

	const { data, error } = useSWR("/api/v1/schools", fetcher);
	const schools = data && !error ? data : {};
	const position = [51.105, -114.158];
	const zoom = 12;

	if (error) {
		return <Alert varient='danger'>There is a problem, try it again.</Alert>;
	}
	if (!data) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}
	return (
		<MapContainer center={position} zoom={zoom} className='right-bordered'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{schools.features.map((school) => (
				<Marker
					key={school.properties.name}
					position={[
						school.geometry.coordinates[1],
						school.geometry.coordinates[0],
					]}
					onClick={() => {
						setActiveSchool(school);
					}}
					icon={icon}>
					<Popup
						position={[
							school.geometry.coordinates[1],
							school.geometry.coordinates[0],
						]}
						onClick={() => {
							setActiveSchool(null);
						}}>
						<div>
							<h6>{school.properties.name}</h6>
							<p>{school.properties.community}</p>
							<p>{school.properties.level}</p>
							<p>Funding: {school.properties.district}</p>
							<p>Male: {school.properties.male}</p>
							<p>Female: {school.properties.femalet}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default App;
