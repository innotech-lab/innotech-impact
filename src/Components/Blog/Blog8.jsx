import { ArrowRight } from "lucide-react";
import { useT } from "../../i18n";
import "./blog.css";

/*
 * Flux éditorial inspiré du bloc Blog8 fourni par le client.
 * Le premier article est dominant : c'est le post récent.
 */
export function Blog8({
  eyebrow = "À la une",
  heading = "Nos dernières idées",
  description = "Des réflexions courtes sur les produits numériques, la transmission et les usages responsables de la technologie.",
  posts = [],
}) {
  const t = useT();

  return (
    <section className="section blog-feed">
      <div className="shell">
        <div className="blog-feed__intro" data-reveal="rise">
          <div>
            <p className="eyebrow">{t(eyebrow)}</p>
            <h2>{t(heading)}</h2>
          </div>
          <p>{t(description)}</p>
        </div>

        <div className="blog-posts" data-reveal="rise" data-reveal-stagger>
          {posts.map((post, index) => (
            <article
              className={`blog-post ${index === 0 ? "blog-post--featured" : ""}`}
              id={post.id}
              key={post.id}
            >
              <a className="blog-post__image" href={`#${post.id}`}>
                <img
                  src={post.image}
                  alt={t(post.title)}
                  loading={index ? "lazy" : "eager"}
                />
              </a>
              <div className="blog-post__body">
                <div className="blog-post__meta">
                  <span>{t(post.label)}</span>
                  {post.tags?.map((tag) => (
                    <span key={tag}>{t(tag)}</span>
                  ))}
                </div>
                <h3>
                  <a href={`#${post.id}`}>{t(post.title)}</a>
                </h3>
                <p>{t(post.summary)}</p>
                <div className="blog-post__footer">
                  <span>{t(post.author)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t(post.published)}</span>
                  <a className="text-link" href={`#${post.id}`}>
                    {t("Lire l’article")} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog8;
