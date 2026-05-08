import {exec} from "child_process";
import {promisify} from "util";

const asyncexec=promisify(exec);

async function runcommand({command}) {
    console.log(command)
    asyncexec(command);
}

runcommand({command: 'mkdir fish-selling-website'})