<template>
  <div class="avatar">
    <template v-if="$store.state.auth">
      <v-menu bottom left>
        <v-btn slot="activator" icon>
          <v-avatar size="32px">
            <img :src="$store.state.user.avatarUrl" />
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile href="/api/auth/logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>
    <template v-else>
      <v-btn round outline href="/api/auth/github">
        Login
      </v-btn>
    </template>
  </div>
</template>

<style>
.v-tabs .v-btn {
  text-transform: none;
}
.avatar {
  align-self: center;
}
.v-menu__activator {
  height: 100%;
}
</style>
