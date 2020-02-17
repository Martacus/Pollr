<template>
  <div id="login" class="container login-container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <b-form>
              <label>Username</label>
              <input class="form-control" />
              <br/>
              <label>Password</label>
              <input class="form-control" type="password"/>
              <br/>
              <button class="btn btn-success" type="button">Confirm</button>
              <button class="btn btn-primary register-button" type="button">Register</button>
          </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
