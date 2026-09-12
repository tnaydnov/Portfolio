# Welcome portrait

`tomer-welcome.webp` and `tomer-blink.webp` are custom artwork based on the portrait Tomer supplied for this redesign. Created with the built-in image generation tool; exported to WebP at quality 88. The source portrait is not included in the repository.

The homepage uses a **2.5D animated portrait**, not a rigged or rotatable 3D model. CSS clips a hand layer from the same artwork, and the Web Animations API plays a brief wrist wave. A masked, aligned eye layer supplies an occasional blink. The mist-and-teal scene, perspective layers, lighting shapes, and all motion are code. A small eased mouse parallax separates the portrait, window and foreground label; it stops and resets when paused, offscreen, or reduced motion is requested. An SVG color matrix keys the white studio background at render time, preserving the opacity of the dark clothing and warm skin.

## Portrait prompt

Use case: stylized-concept. Production asset for a warm personal portfolio.
REFERENCE IMAGE 1 is the real person whose likeness must be preserved.
Create a premium 3D ANIMATED-FILM CHARACTER of this man: recognizable close-cropped dark hair with his natural hairline, thick brows, warm brown eyes, full neatly groomed dark beard, warm olive skin, black knitted crewneck and thin silver chain. His real face shape must be recognizable. Render as a beautifully sculpted digital character with gently simplified facial planes, slightly enlarged expressive eyes, clean groomed strand hair/beard, tactile fabric, soft subsurface scattering. This is unmistakably a carefully crafted 3D character, NOT a photograph of a person. Natural adult proportions, with head only slightly emphasized. Warm relaxed visible SMILE, slightly raised cheeks, kind expressive eyes.
Pose: from head to mid-thigh, mostly facing camera, relaxed. His right hand on image LEFT raised in hello next to his face. Palm faces the viewer, five beautiful natural fingers, forearm mostly vertical. Hand and forearm well separated from the head with empty white space. Elbow connects down at his waist. Other hand tucked casually in trouser pocket.
Eye-level portrait camera. Complete head/hand/elbow inside composition with safe margins. Luxurious warm studio key light, beautiful subtle material detail and soft rim light. No hard contrast or theatrical lights.
BACKGROUND MUST BE SOLID PURE WHITE #ffffff, evenly white all the way to ALL edges. No transparency, NO CHECKERBOARD, no gray or cream, NO floor, no background shadow, no gradient, no props, no text, no panels. The white is necessary for a CSS compositing pipeline. Clean silhouette. Portrait aspect ratio 2:3. Character fills 85% of width and 92% of height.
Priority: recognizable personal likeness + delightful welcoming expression + expensive animated-feature-film rendering. Avoid cartoon baby, generic stock avatar, plastic toy, photoreal photo edit.

## Blink edit prompt

Use case: precise-object-edit.
Input image 1 is the EDIT TARGET, a finished portfolio portrait.
Change ONLY the man's two eyes to gently CLOSED eyelids, as one single relaxed natural blink. Preserve his exact face, beard, smile, hair, pose, hands, clothing, lighting, background, framing, scale, and every other pixel as closely as possible.
Do not tilt or move his head. Do not change brows, nose, mouth, hand, shoulders or torso. Eyes should be fully closed with relaxed eyelid creases, not squeezed shut or laughing.
Output the same 1024x1536 portrait image, on the exact same solid white background. This will be used as a blink overlay aligned on top of the original, so perfect feature alignment is critical. No other changes.

## Under-eye refinement (12 September 2026)

The current artwork softens the under-eye shadows in both the open-eye portrait and the blink asset. The selected edits were made with the built-in image generation tool, then converted with Sharp; no programmatic facial retouching was applied. The composition remains 1024x1536 so the existing hand and eye masks continue to align. The portrait remains 2.5D.

Saved assets:

- `public/images/tomer-welcome.webp`: refined open-eye portrait, WebP quality 88.
- `public/images/tomer-blink.webp`: matching closed-eye refinement, WebP quality 88.
- `public/images/tomer-social.png`: 640x960 PNG exported from the refined portrait for the social card renderer.

The homepage image URLs include `?v=2` so the new artwork does not reuse a previously optimized image cache entry.

Selected portrait edit prompt:

> Retouch dark circles. IMAGE 1 is the full portrait to edit. IMAGE 2 is a magnified detail of the exact problem area, for guidance only. In image 1 REMOVE the brown under-eye bags shown in image 2. The skin beneath both eyes should be much brighter and smoother, with the same healthy peach skin tone as the surrounding cheeks. The dark bags must be substantially reduced, no deep dark crescents below the lower eyelids. A professional gentle under-eye concealer retouch, without altering his facial identity. Keep the eyelids and actual eyes open. Preserve everything outside the eye-bag region. Return the FULL portrait with identical framing and pose to IMAGE 1, 1024 x 1536. The output must show a visible meaningful correction of the dark circles, not merely an identical reconstruction of the source.

Final refinement of that result:

> Please edit the last image: give the man brighter, fresh, well-rested eyes. Remove the dark circles and the heavy bags directly beneath both eyes. Make this area evenly toned and smooth like the upper cheeks. The under-eye circles should be visibly gone. Keep his identity and the rest of the full portrait unchanged.

Blink edit specification:

> Use case: precise-object-edit. Edit the existing 1024x1536 closed-eye portrait. Gently lighten and soften the shadows directly under both eyes by approximately 25-35%, blending naturally with the surrounding warm skin. Retain natural skin texture and eyelid anatomy. Keep both eyes fully closed. Preserve identity, expression, brows, nose, smile, beard, hair, hand, clothing, necklace, pose, scale, feature positions and the white background. Do not reframe or shift the face; this asset must align with the original animation.

## Behavior

- All introduction, navigation, and work content is server-rendered.
- The greeting wave runs once after the portrait loads; the button can replay it.
- Reduced motion shows a still portrait. The greeting button provides a text response.
- Visitors can pause idle animation. Offscreen and hidden-tab animation is suspended.
- No audio, camera, microphone, third-party avatar service, or WebGL is required.
