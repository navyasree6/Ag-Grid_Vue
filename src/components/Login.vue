<template>
<div class="login-form">
    <h2 class= "login-heading">LOGIN</h2>
    <form action= "#">
        <div class= "form-control">
            <label for="email">Username  :</label>
            <input type="text" name="username" v-model="input.username" placeholder="Username" class="login-input"  />

</div>
<div class= "form-control mb-more">
            <label for="password">Password  :</label>
            <input type="password" name="password" v-model="input.password" placeholder="Password" class="login-input" />

</div>
 <div class= "form-control">
        <button type="button" v-on:click="login() " class="button">Login</button>    
</div>
</form>
</div>
</template>

<script>
export default {
    name: 'home',
    data() {
      return {
          authenticated: false,
        input: {
          username: "",
          password: ""
        },
        mockAccount: {
                    username: "navya",
                    password: "password"
                }
    
      }
    },
    methods: {
        login() {
        if (this.input.username != "" && this.input.password != "") {
            if (this.input.username == this.mockAccount.username && this.input.password == this.mockAccount.password) {
            this.$emit("authenticated", true)
            this.$router.push({ path: "/data" });
            } 
            else {
            console.log('The username and / or password is incorrect')
            }
        } else {
          console.log("A username and password must be present")
        }
        }

    }
}
</script>
<style scoped>
.login-form {
  min-width: 300px;
  max-width: 50%;
  margin: auto;
 
}
.login-input{
 padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>
