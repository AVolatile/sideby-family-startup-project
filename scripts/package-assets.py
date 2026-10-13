"""Package only intentional project deliverables, never credentials or runtime state."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED


for category in ("brand", "campaign"):
    destination = Path("public") / category / f"sideby-{category}-kit.zip"
    with ZipFile(destination, "w", ZIP_DEFLATED) as archive:
        for asset in (Path("public") / category).iterdir():
            if asset.is_file() and asset.suffix != ".zip":
                archive.write(asset, f"{category}/{asset.name}")
        for asset in Path("public/fonts").iterdir():
            archive.write(asset, f"fonts/{asset.name}")
        if category == "campaign":
            for asset in Path("public/emails").glob("*.html"):
                archive.write(asset, f"emails/{asset.name}")
        archive.write("portfolio-assets/ASSET-INVENTORY.md", "ASSET-INVENTORY.md")
    print(f"Packaged {destination}")
