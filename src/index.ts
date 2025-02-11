import { program } from "commander";
import { versioning } from "./versioning";
import { explorer } from "./explorer";
import {Node} from "./node";
import {consensus} from "./consensus";

function displayTitle() {
  console.log(`
██████╗ ██████╗ ██╗██╗   ██╗██╗██╗  ██╗      ██████╗██╗     ██╗
██╔══██╗██╔══██╗██║██║   ██║██║╚██╗██╔╝     ██╔════╝██║     ██║
██████╔╝██████╔╝██║██║   ██║██║ ╚███╔╝█████╗██║     ██║     ██║
██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██║ ██╔██╗╚════╝██║     ██║     ██║
██║     ██║  ██║██║ ╚████╔╝ ██║██╔╝ ██╗     ╚██████╗███████╗██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝      ╚═════╝╚══════╝╚═╝
    `);
}

export function runCLI() {
  displayTitle();

  versioning(program);
  explorer(program);
  Node(program);
  consensus(program);

  program.parse(process.argv);
}
