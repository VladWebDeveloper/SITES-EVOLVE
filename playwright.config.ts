import {defineConfig} from "@playwright/test";
export default defineConfig({testDir:"./tests/e2e",timeout:30000,retries:0,reporter:"list",use:{baseURL:"http://127.0.0.1:3002",headless:true,browserName:"chromium",channel:"chrome"},projects:[{name:"chrome-desktop",use:{viewport:{width:1440,height:900}}},{name:"chrome-mobile",use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}}]});
