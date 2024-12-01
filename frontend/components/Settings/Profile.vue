<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ValidationRule } from "~/types";

const valid = ref<boolean>(false)
const firstname = ref<string>('')
const description = ref<string>('')
const email = ref<string>('')

const nameRules = computed<ValidationRule[]>(() => [
  (value) => {
    if (value) return true
    return 'Name is required.'
  },
  (value) => {
    if (value.length <= 30) return true
    return 'Name must be less than 30 characters.'
  },
])

const descriptionRules = computed<ValidationRule[]>(() => [
  (value) => {
    if (value.length <= 300) return true
    return 'Name must be less than 300 characters.'
  },
])

const emailRules = computed<ValidationRule[]>(() => [
  (value) => {
    if (value) return true
    return 'E-mail is required.'
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true
    return 'E-mail must be valid.'
  },
])
</script>

<template>
  <v-form v-model="valid">
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4 text-h5">{{ $t('profile_title_picture') }}</h2>
        <v-row>
          <v-col cols="12" md="3">
            <v-avatar color="background" size="128">
              <!--          <v-img></v-img>-->
              <svg width="64px" height="64px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#F57C00" stroke="#F57C00"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#F57C00"></path> </g></svg>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="9" class="d-flex align-center">
            <v-row>
              <v-col cols="12" md="5">
                <v-btn size="large" class="text-none" color="primary" :ripple="false">{{ $t('profile_change_picture')}}</v-btn>
              </v-col>
              <v-col cols="12" md="7">
                <v-btn size="large" variant="tonal" class="text-none" color="error" :ripple="false">{{ $t('profile_delete_picture')}}</v-btn>
              </v-col>
            </v-row>
          </v-col>

        </v-row>

      </v-col>
      <v-col
          cols="12"
          class="py-0"
      >
        <h2 class="mb-4 text-h5">{{ $t('profile_title_name') }}</h2>
        <v-text-field
            v-model="firstname"
            :counter="30"
            :rules="nameRules"
            :label="$t('profile_title_name_input')"
            required
            variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          class="py-0"
      >
        <h2 class="mb-4 text-h5">{{ $t('profile_title_email') }}</h2>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            disabled
            variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          class="py-0"
      >
        <h2 class="mb-4 text-h5">{{ $t('profile_title_description') }}</h2>
        <v-textarea
            v-model="description"
            :label="$t('profile_title_description_input')"
            :rules="descriptionRules"
            variant="outlined"
            counter="300"
        >

        </v-textarea>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn class="text-none text-h6" size="x-large" color="primary">
          {{ $t('save_changes') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>