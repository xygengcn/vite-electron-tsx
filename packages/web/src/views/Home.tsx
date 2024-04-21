import { defineComponent } from 'vue';
import Logo from '@/assets/logo.png';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <h1>This is Home Page</h1>
        <img src={Logo} />
      </>
    );
  }
});
