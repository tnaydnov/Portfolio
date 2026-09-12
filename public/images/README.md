# Welcome portrait

`tomer-welcome.webp` and `tomer-blink.webp` are custom artwork based on the portrait Tomer supplied for this redesign. Created with the built-in image generation tool; exported to WebP at quality 88. The source portrait is not included in the repository.

The homepage uses a **2.5D animated portrait**, not a rigged or rotatable 3D model. CSS clips a hand layer from the same artwork, and the Web Animations API plays a brief wrist wave. A masked, aligned eye layer supplies an occasional blink. The warm scene, lighting shapes, and all motion are code. An SVG color matrix keys the white studio background at render time, preserving the opacity of the dark clothing and warm skin.

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

## Behavior

- All introduction, navigation, and work content is server-rendered.
- The greeting wave runs once after the portrait loads; the button can replay it.
- Reduced motion shows a still portrait. The greeting button provides a text response.
- Visitors can pause idle animation. Offscreen and hidden-tab animation is suspended.
- No audio, camera, microphone, third-party avatar service, or WebGL is required.
