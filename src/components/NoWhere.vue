<template>
  <div class="no-where">
    <h1>Welcome to the Developer's Abyss</h1>
    <div class="message-area">
      <p>Oops... you've ventured into uncharted territory!</p>
      <p>But don't worry, every developer ends up here at some point.</p>
      <p>Just remember, bugs are just hidden features!</p>
      <img src="https://placekitten.com/200/200" alt="Coding Cat" class="coding-cat"/>
      <p>Click the magical button below to return to the real world:</p>
      <a href="/" class="inner-link">
        <button class="magic-button">Get me back</button>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NoWhere',
}
</script>

<style scoped>
.no-where {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #575757;
  color: #c3c3c3;
  font-family: Roboto, sans-serif;
}

.message-area {
  text-align: center;
  padding: 20px;
}

.coding-cat {
  margin-top: 20px;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

.magic-button {
  background-color: #519945;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.magic-button:hover {
  background-color: #759a6f;
}

.inner-link {
  text-decoration: none;
  color: #ff5733;
  margin-top: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

</style>
