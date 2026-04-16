(function () {
  // Configuration read from the script tag attributes
  const scriptTag = document.currentScript;
  if (!scriptTag) {
    console.error("[CMS Embed] Could not locate script tag.");
    return;
  }

  const cmsUrl = new URL(scriptTag.src).origin;
  const authorId = scriptTag.getAttribute("data-author") || "";
  const targetId = scriptTag.getAttribute("data-target") || "cms-embed";
  let mode = scriptTag.getAttribute("data-mode") || "list"; // 'list' or 'single'
  let slug = scriptTag.getAttribute("data-slug") || "";

  // Dynamic routing based on URL search parameters
  const urlParams = new URLSearchParams(window.location.search);
  const postParam = urlParams.get("post");
  if (postParam) {
    mode = "single";
    slug = postParam;
  }

  // Link format template, e.g., "/blog/:slug". Defaults to the CMS showcase if not provided.
  const linkFormat =
    scriptTag.getAttribute("data-link-format") || `${cmsUrl}/showcase/:slug`;

  async function init() {
    const container = document.getElementById(targetId);
    if (!container) {
      console.error(
        `[CMS Embed] Target container #${targetId} not found. Please add <div id="${targetId}"></div> to your HTML.`,
      );
      return;
    }

    // Attach Shadow DOM to prevent host site CSS from breaking the embed
    const shadow = container.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #18181b;
          line-height: 1.5;
        }
        .loading, .error, .empty {
          color: #71717a;
          font-size: 0.9rem;
          text-align: center;
          padding: 2rem;
        }
        .error { color: #ef4444; }

        /* List Styles */
        .post-list { display: flex; flex-direction: column; gap: 1rem; }
        .post-item {
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
          background: #ffffff;
        }
        .post-item:hover {
          border-color: #d4d4d8;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transform: translateY(-1px);
        }
        .post-title { margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600; line-height: 1.3; }
        .post-meta { margin: 0; font-size: 0.875rem; color: #71717a; display: flex; gap: 0.5rem; align-items: center; }

        /* Single Post Styles */
        .single-post { max-width: 65ch; margin: 0 auto; }
        .single-title { font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; }
        .single-meta { color: #71717a; font-size: 0.95rem; margin-bottom: 2rem; border-bottom: 1px solid #e4e4e7; padding-bottom: 1rem; }
        .single-content { font-size: 1rem; color: #3f3f46; }
        .single-content h1, .single-content h2, .single-content h3 { color: #18181b; margin-top: 2em; margin-bottom: 1em; }
        .single-content p { margin-bottom: 1.5em; }
        .single-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5em 0; }
        .single-content pre { background: #18181b; color: #f4f4f5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        .single-content code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875em; }

        @media (prefers-color-scheme: dark) {
          :host { color: #f4f4f5; }
          .post-item { background: #18181b; border-color: #27272a; }
          .post-item:hover { border-color: #3f3f46; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); }
          .post-meta, .loading, .empty { color: #a1a1aa; }
          .single-meta { border-color: #27272a; }
          .single-content { color: #d4d4d8; }
          .single-content h1, .single-content h2, .single-content h3 { color: #f4f4f5; }
        }
      </style>
      <div id="wrapper">
        <div class="loading">Loading content...</div>
      </div>
    `;

    const wrapper = shadow.getElementById("wrapper");

    try {
      if (mode === "single" && slug) {
        await renderSingle(wrapper, slug);
      } else {
        await renderList(wrapper);
      }
    } catch (error) {
      console.error("[CMS Embed] Error:", error);
      wrapper.innerHTML = '<div class="error">Failed to load content.</div>';
    }
  }

  async function renderList(wrapper) {
    const url = new URL("/api/posts", cmsUrl);
    if (authorId) url.searchParams.set("authorId", authorId);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();

    if (!posts || posts.length === 0) {
      wrapper.innerHTML = '<div class="empty">No posts available yet.</div>';
      return;
    }

    const list = document.createElement("div");
    list.className = "post-list";

    posts.forEach((post) => {
      const date = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const targetUrl = linkFormat.replace(":slug", post.slug);

      const item = document.createElement("a");
      item.className = "post-item";
      item.href = targetUrl;
      // If linking back to the CMS showcase, open in new tab
      if (targetUrl.includes(cmsUrl)) {
        item.target = "_blank";
        item.rel = "noopener noreferrer";
      }

      item.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <div class="post-meta">
          <span>${date}</span>
          <span>•</span>
          <span>${post.author?.name || "Author"}</span>
        </div>
      `;

      list.appendChild(item);
    });

    wrapper.innerHTML = "";
    wrapper.appendChild(list);
  }

  async function renderSingle(wrapper, slug) {
    const url = new URL(`/api/posts/${slug}`, cmsUrl);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        wrapper.innerHTML = '<div class="empty">Post not found.</div>';
        return;
      }
      throw new Error("Failed to fetch post");
    }

    const post = await response.json();
    const date = new Date(post.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const article = document.createElement("article");
    article.className = "single-post";

    article.innerHTML = `
      <h1 class="single-title">${post.title}</h1>
      <div class="single-meta">
        ${date} • By ${post.author?.name || "Author"}
      </div>
      <div class="single-content">
        ${post.content}
      </div>
    `;

    wrapper.innerHTML = "";
    wrapper.appendChild(article);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
