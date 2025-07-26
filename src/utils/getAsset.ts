const assetMap = import.meta.glob("/src/assets/**/*", {
    eager: true,
    import: "default",
});

/**
 * Returns image src and alt text derived from file name.
 * Supports fallback to `public/` folder if not found in src/assets.
 */
export function getAssetMeta(relativePath: string): { src: string; alt: string } {
    const normalizedSrcPath = `/src/assets/${relativePath}`;
    const asset = assetMap[normalizedSrcPath] as string | undefined;

    // Generate alt from filename
    const fileName = relativePath.split("/").pop() || "";
    const alt =
        fileName
            .replace(/\.[^/.]+$/, "") // Remove extension
            .replace(/[-_]/g, " ") // Replace dashes/underscores
            .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase spacing
            .replace(/\s+/g, " ") // Collapse spaces
            .trim() || "Asset";

    // Fallback to public path if asset not found
    const src = asset || `/${relativePath}`;

    return { src, alt };
}
