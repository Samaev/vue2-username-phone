<template>
  <div class="main-wrapper">
    <div class="header"></div>
    <div class="card-container">
      <div class="card">
        <h2 class="card__header">description</h2>
        <form class="card__form">
          <div class="card__form-title">description</div>
          <div class="form__group">
            <input type="text" class="form__input" placeholder="Username" v-model="userName" v-on:keypress="isValidSymbol($event, false)">
          </div>
          <div class="form__group">
            <input type="tel" class="form__input" placeholder="Phone Number" v-model="userPhoneNumber" v-on:keypress="isValidSymbol($event, true)">
          </div>
        </form>
        <div class="card__footer">
          <button class="card__button" v-on:click="submitFormRegistration()">Register</button>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginPage',
  data() {
    return {
      userName : '',
      userPhoneNumber: '',
      usersFromServer :[]
    }
  },
  methods :{
    isValidSymbol(e, isNumber) {
      let char = String.fromCharCode(e.keyCode);
      if(!isNumber){
        if(/^[A-Za-z]+$/.test(char)) return true;
        else e.preventDefault();
      } else {
        if(!/^[A-Za-z]+$/.test(char)) return true;
        else e.preventDefault();
      }
    },
    submitFormRegistration(){
      axios.get('https://jsonplaceholder.typicode.com/users')
          .then(response=>{
            console.log(response);
            this.usersFromServer = response.data;
            console.log(this.usersFromServer);
            const foundUser = this.usersFromServer.find(user=>{
              return user.username === this.userName && user.phone === this.userPhoneNumber;
            });
            console.log(foundUser);
          })
          .catch(error => {
            console.error('Error:', error);
          });
          }
        }
}
</script>

<style scoped>
.main-wrapper{
  background-color: #545454;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 450px;
}

.card__header {
  height: 50px;
  background-color: #A5A5A5;
  color:#5F5F5F;
  font-size: 17px;
  margin:0;
  line-height: 50px;
  font-weight: 400;
  text-align: center;
}

.card__form {
  padding-left: 20px;
  background-color: #c3c3c3;
}

.card__form-title{
  text-align: left;
  height: 50px;
  background-color: #c3c3c3;
  color:#5F5F5F;
  font-size: 17px;
  margin:0;
  line-height: 50px;
  font-weight: 400;
}

.form__input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form__input::placeholder{
  color:#000;
  font-weight: 400;
  font-size: 17px;
  font-family: Roboto, sans-serif;
}

.card__button {
  background-color: #519945;
  width: 100%;
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.card__footer{
  height: 50px;
  background-color: #c3c3c3;
  padding: 10px 20px 20px;
}
.header {
  background-color: #474747;
  color: #fff;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.footer {
  background-color: #474747;
  color: #fff;
  height: 270px;
  text-align: center;
  line-height: 270px;
}
.card-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
