
import { Server } from "./presentation/server";
import { envs } from "./config/plugis/envs.plugin";
import { AppRoutes } from "./presentation/app.routes";

(async()=>{
    main();
})()

async function main(){
    

    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    serverExpress.start();

}