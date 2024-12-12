<template>
  <GeneralLogCredentials
    :formato="info"
    v-model:fieldOne="correo"
    v-model:fieldTwo="password"
    :action="signIn"
    :loginError="loginResult"
    class="pb-sm-15 py-sm-5 py-15 px-5"
  />
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAdminStore } from '/stores/admin.js';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    definePageMeta({
      middleware: 'admin',
      layout: 'admin',
    });
    
    const { t } = useI18n();
    const localePath = useLocalePath()
    const useAdmin = useAdminStore();
    const correo = ref('');
    const password = ref('');
    const auth = getAuth();
    const loginResult = ref(false);
    const signIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, correo.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            useAdmin.updateDetails({signOutButton: 'true'});
            return navigateTo(localePath('/admin/reservas')), user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            loginResult.value = true;
            return console.log(errorCode, errorMessage)
          });
        return signIn;
      } catch (error) {
        console.error('Error signing in:', error.code, error.message);
      }
    };

    const info = computed(()=> {
      return {
        InputUno: [t('cuentaLog'), t('correo'), 'mdi-email-outline'],
        InputDos: [t('contraseña'), t('contraseñaCall'), 'mdi-lock-outline'],
        Descripcion:
          t('logDescription'),
        Login: true,
        btn: [t('ingresar'), '/admin/reservas'],
        contrasena: true,
      }
    });

    return { signIn, correo, password, loginResult, info };
  },
};
</script>
