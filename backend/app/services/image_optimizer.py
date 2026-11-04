import io
from typing import Tuple
from PIL import Image, ImageOps


def optimize_image(
    image_bytes: bytes,
    max_dimension: int = 1920,
    quality: int = 82
) -> Tuple[bytes, str, int, int]:
    """
    Auto-orients EXIF rotation, downscales resolution, and compresses image to modern WebP.
    
    Returns:
        (webp_bytes, content_type, width, height)
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        raise ValueError(f"រូបភាពមិនត្រឹមត្រូវ ឬខូច (Invalid or corrupt image): {str(e)}")

    # Auto-orient based on mobile camera EXIF orientation tag
    img = ImageOps.exif_transpose(img)

    # Handle image modes
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    orig_width, orig_height = img.size

    # Downscale if resolution exceeds max_dimension
    if orig_width > max_dimension or orig_height > max_dimension:
        if orig_width > orig_height:
            new_width = max_dimension
            new_height = int(orig_height * (max_dimension / orig_width))
        else:
            new_height = max_dimension
            new_width = int(orig_width * (max_dimension / orig_height))
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    final_width, final_height = img.size

    # Save to WebP in memory
    output_buffer = io.BytesIO()
    img.save(output_buffer, format="WEBP", quality=quality, method=6)
    webp_bytes = output_buffer.getvalue()

    return webp_bytes, "image/webp", final_width, final_height
