import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt || 'Cute 3D Superhero Kid';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment.');
    }

    const enhancedPrompt = `Cute 3D Pixar style digital avatar icon, ${prompt}, vibrant background, high resolution 3D render, circular avatar composition`;

    // Attempt 1: Call Google AI Studio Imagen 3 API using GEMINI_API_KEY
    if (apiKey) {
      try {
        const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`;
        const res = await fetch(imagenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: enhancedPrompt,
            config: {
              numberOfImages: 1,
              aspectRatio: '1:1',
              outputMimeType: 'image/png',
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const base64Bytes = data?.generatedImages?.[0]?.image?.imageBytes;
          if (base64Bytes) {
            return NextResponse.json({
              success: true,
              avatarUrl: `data:image/png;base64,${base64Bytes}`,
              source: 'gemini-imagen-3',
            });
          }
        } else {
          console.warn('Google AI Studio Imagen 3 API status:', res.status, await res.text());
        }
      } catch (err) {
        console.error('Error calling Gemini Imagen API:', err);
      }
    }

    // Attempt 2: AI Image Generation Fallback (Pollinations AI / Styled Avatar Service)
    const encodedPrompt = encodeURIComponent(`${enhancedPrompt}, 3d render, pixar character style`);
    const aiAvatarUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=300&height=300&nologo=true&seed=${Date.now()}`;

    return NextResponse.json({
      success: true,
      avatarUrl: aiAvatarUrl,
      source: 'ai-generator',
    });
  } catch (error) {
    console.error('Avatar generation route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate avatar' },
      { status: 500 }
    );
  }
}
