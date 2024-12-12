import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const localePath = useLocalePath()
    const auth = getAuth();
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

      if (user) {
        return navigateTo(localePath('/admin/reservas'), { redirectCode: 301 });
      }
    })

  