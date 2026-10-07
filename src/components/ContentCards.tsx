"use client";

import { usePencrack } from "@/context/PencrackContext";
import { Story, Blog, Poem, Comic, Writer, ServiceItem, WRITERS, getImgUrl } from "@/data/pencrackData";

interface ContentCardProps {
  data: Story | Blog;
  type: "Story" | "Blog";
}

export function ContentCard({ data, type }: ContentCardProps) {
  const { openReader, openGift } = usePencrack();
  const writer = WRITERS[data.w] || WRITERS[0];
  const cover = getImgUrl(data.i);

  return (
    <div
      onClick={() => openReader(data, type)}
      className="card group"
    >
      <img
        className="cover"
        src={cover}
        alt={data.t}
        loading="lazy"
      />
      <div className="body">
        <span className="tag">{data.c || type}</span>
        <h3 className="group-hover:text-[var(--brown-700)] transition-colors line-clamp-2">
          {data.t}
        </h3>
        <p className="excerpt line-clamp-2">{data.e || ""}</p>

        <div className="card-foot">
          <div className="who">
            <img src={writer.img} alt={writer.n} />
            <div>
              <div className="wn">{writer.n}</div>
              <div className="wm">{"d" in data && data.d ? data.d : "Pencrack"}</div>
            </div>
          </div>
        </div>

        <div className="meta">
          <span>⏱️ {data.rt || "5 min"}</span>
          <span>👁️ {data.reads}</span>
          <span>❤️ {data.likes}</span>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn btn-soft btn-sm flex-1"
            onClick={(e) => {
              e.stopPropagation();
              openReader(data, type);
            }}
          >
            Read
          </button>
          <button
            type="button"
            className="btn btn-gift btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              openGift(writer.n, writer.img);
            }}
          >
            🎁 Gift
          </button>
        </div>
      </div>
    </div>
  );
}

export function PoemCard({ poem }: { poem: Poem }) {
  const { openReader, openGift } = usePencrack();
  const writer = WRITERS[poem.w] || WRITERS[0];

  return (
    <div
      onClick={() => openReader(poem, "Poem")}
      className="poem group"
    >
      <h3 className="group-hover:text-[var(--brown-700)] transition-colors">
        {poem.t}
      </h3>
      <div className="verse line-clamp-4">{poem.v}</div>
      <div className="pfoot">
        <div className="who">
          <img src={writer.img} alt={writer.n} />
          <div className="wn">{writer.n}</div>
        </div>
        <div className="meta">
          <span>❤️ {poem.likes}</span>
          <button
            type="button"
            className="btn btn-gift btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              openGift(writer.n, writer.img);
            }}
          >
            🎁
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComicCard({ comic }: { comic: Comic }) {
  const { openReader, openGift } = usePencrack();
  const writer = WRITERS[comic.w] || WRITERS[0];
  const cover = getImgUrl(comic.i, 400);

  return (
    <div
      onClick={() => openReader(comic, "Comic")}
      className="comic group"
    >
      <img src={cover} alt={comic.t} loading="lazy" />
      <div className="cbody">
        <span className="tag">{comic.c}</span>
        <h3 className="group-hover:text-[var(--brown-700)] transition-colors">
          {comic.t}
        </h3>
        <p className="muted text-sm flex-1 line-clamp-2">{comic.e}</p>
        <div className="meta">
          <span>👁️ {comic.reads}</span>
          <span>❤️ {comic.likes}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="who">
            <img src={writer.img} alt={writer.n} />
            <div className="wn">{writer.n}</div>
          </div>
          <button
            type="button"
            className="btn btn-gift btn-sm ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              openGift(writer.n, writer.img);
            }}
          >
            🎁 Gift
          </button>
        </div>
      </div>
    </div>
  );
}

export function WriterCard({ writer, supported }: { writer: Writer; supported?: boolean }) {
  const { openGift, showToast } = usePencrack();

  return (
    <div className="writer-card">
      <img
        src={writer.img}
        alt={writer.n}
        className="cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => showToast(`Viewing ${writer.n}'s profile`)}
      />
      <h4>{writer.n}</h4>
      <div className="uname">{writer.u}</div>
      <div className="wstats">
        <div>
          <b>{writer.followers || "12.4k"}</b>
          Followers
        </div>
        <div>
          <b>{writer.worksCount || 24}</b>
          Works
        </div>
      </div>
      {supported && (
        <div className="pill mb-3">🎁 {writer.supportedAmt || "₦1.2M"} supported</div>
      )}
      <button
        type="button"
        className="btn btn-gift btn-sm btn-block"
        onClick={() => openGift(writer.n, writer.img)}
      >
        Support
      </button>
    </div>
  );
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const { openServiceRequest } = usePencrack();

  return (
    <div
      onClick={() => openServiceRequest(service.name)}
      className="svc group"
    >
      <div className="ico">
        <span className="text-xl">✍️</span>
      </div>
      <h4 className="group-hover:text-[var(--brown-700)] transition-colors">
        {service.name}
      </h4>
      <p>{service.desc}</p>
      <button
        type="button"
        className="btn btn-ghost btn-sm mt-auto"
        onClick={(e) => {
          e.stopPropagation();
          openServiceRequest(service.name);
        }}
      >
        Request Service
      </button>
    </div>
  );
}
