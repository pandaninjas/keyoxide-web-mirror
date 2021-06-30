
{ pkgs ? import <nixpkgs> {}}:
let
  unstable = import (fetchTarball "https://channels.nixos.org/nixpkgs-unstable/nixexprs.tar.xz") {};
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
  	nodejs
		yarn
    xvfb_run
    unstable.cypress
  ];

  CYPRESS_INSTALL_BINARY=0; #skip installing the Cypress binary from yarn
  CYPRESS_RUN_BINARY="${unstable.cypress}/bin/Cypress";
}
