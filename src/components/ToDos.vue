<template>
  <div class="todosWrapper">
    <h1>ToDos Place</h1>
    <div v-if="userFromServer">
      <div class="container">
        <div class="card-info">
          <h1>User Information</h1>
          <p><strong>ID:</strong> {{ userFromServer.id }}</p>
          <p><strong>Name:</strong> {{ userFromServer.name }}</p>
          <p><strong>Username:</strong> {{ userFromServer.username }}</p>
          <p><strong>Email:</strong> {{ userFromServer.email }}</p>
          <p><strong>Phone:</strong> {{ userFromServer.phone }}</p>
          <div ref="map" class="map"></div>
        </div>
        <div class="card-info">
          <h1>Our Todos</h1>
          <div v-for="(todo,index) in todos" v-bind:key="index">{{ todo.title }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Icon, Style} from 'ol/style';
import axios from "axios";

export default {
  name: 'ToDos',
  data() {
    return {
      todos: []
    }
  },
  props: ['userFromServer'],
  mounted() {
    this.initMap();
  },
  beforeMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          this.todos = response.data;
        })
  },
  methods: {
    initMap() {
      if (this.userFromServer) {
        const markerSource = new VectorSource();

        const markerFeature = new Feature({
          geometry: new Point(fromLonLat([parseFloat(this.userFromServer.address.geo.lng), parseFloat(this.userFromServer.address.geo.lat)])),
        });

        markerFeature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 23],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '/pin.png', // Replace with the path to your marker icon
              }),
            })
        );

        // Add the marker feature to the marker source
        markerSource.addFeature(markerFeature);

        // Create the map with a marker layer
        new Map({
          target: this.$refs.map,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: markerSource, // Add the marker source to the vector layer
            }),
          ],
          view: new View({
            center: fromLonLat([parseFloat(this.userFromServer.address.geo.lng), parseFloat(this.userFromServer.address.geo.lat)]),
            zoom: 10,
          }),
        });
      }
    },
  },
}
</script>

<style scoped>
.todosWrapper {
  color: #c3c3c3;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  align-items: center;
  min-height: 100vh;
}

.card-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: left;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

p {
  margin: 0;
  line-height: 1.5;
  color: #666;
}

strong {
  font-weight: bold;
}

span {
  color: #333;
}

.map {
  width: 100%;
  height: 120px; /* Adjust the height as needed */
}
</style>
