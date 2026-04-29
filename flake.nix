{
  description = "npm:@zeroconf/libsql";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_24;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            nodejs
            pkgs.typescript-language-server
          ];
          shellHook = ''
            echo "node `${nodejs}/bin/node --version`"
          '';
        };
      }
    );
}
