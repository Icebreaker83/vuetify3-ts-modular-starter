<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRegistrationModule, type RegisterUser } from '@/modules/registration';
import { useI18n } from 'vue-i18n';
import RegisterUserForm from '@/components/forms/register-user/RegisterUserForm.vue';
import PageLayout from '@/layouts/PageLayout.vue';

const { registerUser } = useRegistrationModule();
const { t } = useI18n();
const router = useRouter();

const onSbumit = (data: RegisterUser) => {
  registerUser(data, router, t);
};
const cancel = () => {
  router.push({ name: 'home' });
};
</script>
<template>
  <PageLayout>
    <RegisterUserForm @submit="onSbumit" @cancel="cancel" />
  </PageLayout>
</template>
