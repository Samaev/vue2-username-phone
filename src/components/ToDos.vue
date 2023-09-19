<template>
  <div class="todosWrapper">
    <div class="title-banner">
      <h1 class="title-banner__text">ToDos Place</h1>
      <button class="title-banner__button"><a href="/">Register Page</a></button>
    </div>
    <div v-if="userFromServer">
      <div class="container">
        <div class="aside-panel">
          <div class="card-info">
            <h1>User Information</h1>
            <p><strong>ID:</strong> {{ userFromServer.id }}</p>
            <p><strong>Name:</strong> {{ userFromServer.name }}</p>
            <p><strong>Username:</strong> {{ userFromServer.username }}</p>
            <p><strong>Email:</strong> {{ userFromServer.email }}</p>
            <p><strong>Phone:</strong> {{ userFromServer.phone }}</p>
            <div ref="map" class="map"></div>
          </div>

          <div class="create-todo">
            <h3 style="color:#c3c3c3">Create TODO:</h3>
            <input type="number" placeholder="User ID" v-model="newTodo.userId">
            <input type="text" placeholder="Title" v-model="newTodo.title">
            <button @click="createTodo()">Add</button>
          </div>
        </div>

        <div class="card-info">
          <h1>Our Todos</h1>
          <div class="filter-container">
            <select v-model="criteria">
              <option v-for="(criteria, index) in filterCriteria" v-bind:key="index">{{ criteria }}</option>
            </select>
            <select v-model="criteriaByUsers">
              <option value="all">All users</option>
              <option v-for="(userId, index) in getUniqueUsersIds(todos)" v-bind:key="index">{{ userId }}</option>
            </select>
            <input type="text" placeholder="Search..." v-model="searchTerm">
          </div>
          <table>
            <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>User</th>
              <th>Status</th>
              <th>Favourite</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(todo,index) in filteredTodos" v-bind:key="index">
              <td>{{ todo.id }}</td>
              <td>{{ todo.title }}</td>
              <td>{{ todo.userId }}</td>
              <td>
                <template v-if="todo.completed"><span style="color:green">&#10003;</span></template>
                <template v-else><span style="color:red">&#10005;</span></template>
              </td>
              <td>
                <input type="checkbox" class="star" title="Set favourite" @click="toggleFavorite(todo.id)"
                       :checked="favouriteTodosId.includes(todo.id)">
              </td>
            </tr>
            </tbody>
          </table>
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
import Sweet from "sweetalert2";

export default {
  name: 'ToDos',
  data() {
    return {
      todos: [],
      filterCriteria: [
        'All', 'Completed', 'Uncompleted', 'Favourites'
      ],
      searchTerm: '',
      criteria: 'All',
      criteriaByUsers: 'all',
      favouriteTodosId: [],
      newTodo: {
        id: '',
        title: '',
        userId: '',
        completed: false
      }
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
        .catch(error => {
          console.error('Error:', error);
        });
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
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://maps.google.com/mapfiles/kml/paddle/red-blank.png',
              }),
            })
        );

        markerSource.addFeature(markerFeature);

        new Map({
          target: this.$refs.map,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: markerSource,
            }),
          ],
          view: new View({
            center: fromLonLat([parseFloat(this.userFromServer.address.geo.lng), parseFloat(this.userFromServer.address.geo.lat)]),
            zoom: 10,
          }),
        });
      }
    },
    getUniqueUsersIds(array) {
      const uniqueUserIds = new Set();
      array.forEach(item => {
        uniqueUserIds.add(item.userId);
      });
      return Array.from(uniqueUserIds);
    },
    createTodo() {
      this.newTodo.id = this.todos.reduce((max, obj) => (obj.id > max ? obj.id : max), this.todos[0].id) + 1;
      this.favouriteTodosId = this.favouriteTodosId.filter(id => id != this.newTodo.id);
      this.todos.push(this.newTodo);
      this.newTodo = {
        id: '',
        title: '',
        userId: '',
        completed: false
      };
      Sweet.fire({
        icon: 'success', text: "Todo is successfully created!", timer: 2500, showConfirmButton: false
      })
    },
    toggleFavorite(todoId) {
      const index = this.favouriteTodosId.indexOf(todoId);

      if (index !== -1) {
        this.favouriteTodosId.splice(index, 1);
      } else {
        this.favouriteTodosId.push(todoId);
      }
      localStorage.setItem('favoriteTodosId', JSON.stringify(this.favouriteTodosId));
    },
  },
  computed: {
    filteredTodos() {
      return this.todos.filter((todo) => {
        return (
            (this.criteria === "All" || (this.criteria === "Completed" && todo.completed) || (this.criteria === "Uncompleted" && !todo.completed) || (this.criteria === "Favourites" && this.favouriteTodosId.includes(todo.id))) &&
            (this.criteriaByUsers === "all" || todo.userId == this.criteriaByUsers) &&
            todo.title.includes(this.searchTerm)
        );
      });

    }
  },
  created() {
    const storedFavorites = localStorage.getItem('favoriteTodosId');
    if (storedFavorites) {
      this.favouriteTodosId = JSON.parse(storedFavorites);
    }
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
  justify-content: center;
  gap: 25px;
  min-height: 100vh;
  align-items: self-start;
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
  height: 120px;
}

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* Individual filter elements */
select, input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.star {
  visibility: hidden;
  font-size: 30px;
  cursor: pointer;
}

.star:before {
  content: "\2606";
  position: absolute;
  visibility: visible;
  transform: translateY(-15px);
}

.star:checked:before {
  content: "\2605";
  position: absolute;
  transform: translateY(-15px);
}

.create-todo {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.create-todo input[type="text"],
.create-todo input[type="number"],
.create-todo button {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-todo button {
  background-color: #519945;
  color: white;
  cursor: pointer;
  border: none;
}

.title-banner {
  display: flex;
  justify-content: space-around;

}

.title-banner__text {
  color: #c3c3c3;

}

.title-banner__button a {
  color: rgba(56, 68, 54, 0.8);
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  table {
    font-size: 14px;
  }
}
</style>
