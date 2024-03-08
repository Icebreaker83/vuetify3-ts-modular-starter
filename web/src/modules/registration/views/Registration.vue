<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="heading-section bg-indigo mb-16">
      <v-spacer />
      <v-col class="d-flex align-center" cols="4">
        <div>
          <h1 class="text-h3 font-weight-regular">{{ $t('registration.self') }}</h1>
          <v-divider :thickness="8" :length="67" class="border-opacity-100 mt-6" color="#82b1ff"></v-divider>
        </div>
      </v-col>
      <v-col cols="4"></v-col>
      <v-spacer />
    </v-row>
    <v-row no-gutters class="main-section mb-16">
      <v-spacer />
      <v-col class="d-flex flex-column" cols="4">
        <div class="mb-16">
          <h1 class="text-h3 font-weight-regular">{{ $t('registration.form.organization.heading') }}</h1>
          <v-divider :thickness="8" :length="67" class="border-opacity-100 mt-6" color="#82b1ff"></v-divider>
        </div>
        <div>
          <h1 class="text-h3 font-weight-regular">{{ $t('registration.form.admin.heading') }}</h1>
          <v-divider :thickness="8" :length="67" class="border-opacity-100 mt-6" color="#82b1ff"></v-divider>
        </div>
      </v-col>
      <v-col cols="4"></v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.heading-section {
  height: 250px;
  border-bottom: 15px solid #82b1ff;
}
</style>
