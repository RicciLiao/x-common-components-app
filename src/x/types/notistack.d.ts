import {type AppAlertInterface} from "../ui/AppSnackbarProvider";

declare module "notistack" {
    interface VariantOverrides {
        alert: {
            data: AppAlertInterface
        };
    }
}
