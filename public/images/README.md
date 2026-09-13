# Welcome portrait

The September 12, 2026 portrait was regenerated from Tomer's supplied identity photograph after the previous retouched version became soft. The source photograph is not published in this repository.

## Current assets

- `tomer-welcome.webp`: newly generated open-eye portrait, 1024 × 1536, WebP quality 95.
- `tomer-blink.webp`: aligned closed-eye edit of that portrait, 1024 × 1536, WebP quality 95.
- `tomer-social.png`: 640 × 960 PNG exported from the open-eye portrait for Next.js social-image rendering.

The homepage requests quality 95 and uses versioned `?v=3` URLs to invalidate the previous optimized assets. The generated source is 1024 × 1536; it has not been enlarged and presented as a higher-resolution original. The new composition allocates more source pixels to the face, and preserves visible hair, skin and knit detail.

All generative work used the built-in image generation tool. Sharp was used only for web-format export and the social-card resize. No programmatic facial retouching was applied.

## Generation brief

Regenerate a professional, photoreal portfolio portrait using the supplied photo as the identity reference. Preserve the man's close-cropped dark hair, hairline, brown eyes, beard, black knitted crewneck and thin silver chain. Use a friendly, relaxed expression and a raised right hand on the left of the image. Keep the fingers, face, skin texture, hair and fabric crisp. Use soft studio lighting and natural, rested-looking eyes without plastic skin or heavy smoothing.

The initial generated background did not provide usable transparency. A subsequent image-tool edit replaced it with a plain white studio background while preserving the portrait. A final aligned edit changed only the eyes to gently closed eyelids for the blink layer. These descriptions summarize the actual generation and edit requests.

## Rendering and motion

The homepage uses a **2.5D layered portrait**. The portrait is not a rigged or rotatable 3D model. CSS clips matched body, wrist and hand layers from the same artwork. The Web Animations API supplies a brief wrist wave; a masked eye layer supplies the blink. Hand pivots and eye masks were remapped to the regenerated pose.

An SVG color matrix keys the white background at render time. It is attached to each image before the surrounding layer is clipped or animated; an animated child can bypass a filter on its ancestor in WebKit. The September 13 rendering fix changes this compositing boundary without regenerating, resizing or retouching the portrait assets. The surrounding mist-and-teal window, depth layers, lighting shapes and all motion are code. Mouse parallax uses a small eased angle.

- Introduction, navigation and work content are server-rendered.
- The initial wave waits for the portrait to load and enter view. Visitors can replay it.
- Pause, reduced-motion preferences, offscreen state and hidden tabs stop animation.
- Reduced motion retains a still portrait and a text greeting.
- No audio, camera, microphone, third-party avatar service or WebGL is needed.
