import Image from "next/image";

export type ArticleImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function ArticleImage({ src, alt, width, height, caption }: ArticleImageProps) {
  return (
    <figure className="article-media article-image">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${alt}`}>
        <Image src={src} alt={alt} width={width} height={height}
          sizes="(max-width: 720px) calc(100vw - 36px), 800px"
          unoptimized={!src.startsWith("/")} />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function ImageGallery({ images }: { images: readonly ArticleImageProps[] }) {
  return (
    <div className="article-gallery">
      {images.map((image) => <ArticleImage key={image.src} {...image} />)}
    </div>
  );
}

export type ArticleVideoProps = {
  title: string;
  caption?: string;
  orientation?: "landscape" | "portrait";
} & (
  | { youtubeId: string; src?: never; poster?: never; captions?: never }
  | { src: string; youtubeId?: never; poster?: string; captions?: { src: string; language: string; label: string } }
);

export function ArticleVideo(props: ArticleVideoProps) {
  return (
    <figure className={`article-media article-video${props.orientation === "portrait" ? " article-video-portrait" : ""}`}>
      {props.youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(props.youtubeId)}`}
          title={props.title}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <video controls playsInline preload="none" poster={props.poster} aria-label={props.title}>
          <source src={props.src} />
          {props.captions ? <track kind="captions" src={props.captions.src} srcLang={props.captions.language} label={props.captions.label} default /> : null}
          Your browser does not support embedded video. <a href={props.src}>Open the video</a>.
        </video>
      )}
      {props.caption ? <figcaption>{props.caption}</figcaption> : null}
    </figure>
  );
}

export type ArticleAudioProps = { src: string; title: string; caption?: string };

export function ArticleAudio({ src, title, caption }: ArticleAudioProps) {
  return (
    <figure className="article-media article-audio">
      <figcaption><strong>{title}</strong>{caption ? <span>{caption}</span> : null}</figcaption>
      <audio controls preload="none" aria-label={title}>
        <source src={src} />
        Your browser does not support embedded audio.
      </audio>
      <a href={src} download>Download audio <span aria-hidden="true">↓</span></a>
    </figure>
  );
}
