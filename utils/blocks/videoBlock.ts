import type { ContentBlock } from "~/types/content-builder";

export default function renderVideoBlock(block: ContentBlock): string {
  const videoProps = block.videoProps || {
    provider: "youtube",
    videoId: "",
    title: "Video embebido",
    aspectRatio: "16:9",
    autoplay: false,
    controls: true,
  };

  let embedUrl = "";
  let aspectRatioClass = "aspect-video";

  if (videoProps.aspectRatio === "4:3") {
    aspectRatioClass = "aspect-[4/3]";
  } else if (videoProps.aspectRatio === "1:1") {
    aspectRatioClass = "aspect-square";
  }

  if (videoProps.provider === "youtube") {
    embedUrl = `https://www.youtube.com/embed/${videoProps.videoId}?autoplay=${
      videoProps.autoplay ? 1 : 0
    }&controls=${videoProps.controls ? 1 : 0}`;
  } else if (videoProps.provider === "vimeo") {
    embedUrl = `https://player.vimeo.com/video/${videoProps.videoId}?autoplay=${
      videoProps.autoplay ? 1 : 0
    }&controls=${videoProps.controls ? 1 : 0}`;
  } else if (videoProps.provider === "dailymotion") {
    embedUrl = `https://www.dailymotion.com/embed/video/${
      videoProps.videoId
    }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
      videoProps.controls ? 1 : 0
    }`;
  }

  return `
    <div class="w-full h-full">
      <div class="${aspectRatioClass} w-full overflow-hidden rounded-md bg-gray-100">
        ${
          videoProps.videoId
            ? `<iframe 
                src="${embedUrl}" 
                title="${videoProps.title || "Video embebido"}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-full"
              ></iframe>`
            : `<div class="w-full h-full flex items-center justify-center bg-gray-100">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-500">Ingrese un ID de video</p>
                </div>
              </div>`
        }
      </div>
      ${
        videoProps.title
          ? `<p class="text-sm text-gray-500 mt-2">${videoProps.title}</p>`
          : ""
      }
    </div>
  `;
}
