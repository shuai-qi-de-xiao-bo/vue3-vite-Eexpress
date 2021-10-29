import {
    ref
} from "vue";
import { captcha } from "@/api/login";
export default function () {
    const captchaSrc = ref("");
    const captchaLoading = ref(false);
    const getCaptchaSrc = () => {
        captchaLoading.value = true;
        captcha().then((res) => {
            captchaLoading.value = false;
            captchaSrc.value = res.src;
        }).catch(() => {
            captchaLoading.value = false;
        });
    };
    return {
        captchaLoading,
        captchaSrc,
        getCaptchaSrc
    }
}