"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { openApiSpec } from "@/lib/openapi";

type HttpMethod = "get" | "post" | "patch" | "delete" | "put";

interface EndpointItem {
  id: string;
  path: string;
  method: HttpMethod;
  tag: string;
  summary: string;
  description?: string;
  security?: any[];
  parameters?: any[];
  requestBody?: any;
  responses?: Record<string, any>;
}

export default function ApiDocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("");
  const [activeCodeTab, setActiveCodeTab] = useState<"curl" | "fetch" | "python">("curl");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<"studio" | "schemas">("studio");

  // Auth token state
  const [authToken, setAuthToken] = useState<string>("");
  const [authRole, setAuthRole] = useState<string>("");

  // Per-endpoint live playground parameters & body
  const [paramInputs, setParamInputs] = useState<Record<string, Record<string, string>>>({});
  const [customBody, setCustomBody] = useState<Record<string, string>>({});

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [liveResponse, setLiveResponse] = useState<{
    status: number;
    statusText: string;
    timeMs: number;
    data: any;
    error?: string;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Extract all endpoints from openApiSpec
  const endpoints: EndpointItem[] = useMemo(() => {
    const list: EndpointItem[] = [];
    Object.entries(openApiSpec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, op]: [string, any]) => {
        const httpMethod = method.toLowerCase() as HttpMethod;
        const tag = op.tags?.[0] || "General";
        list.push({
          id: `${httpMethod}-${path.replace(/[^a-zA-Z0-9]/g, "-")}`,
          path,
          method: httpMethod,
          tag,
          summary: op.summary || "",
          description: op.description || "",
          security: op.security,
          parameters: op.parameters,
          requestBody: op.requestBody,
          responses: op.responses,
        });
      });
    });
    return list;
  }, []);

  // Set default selected endpoint
  useEffect(() => {
    if (!selectedEndpointId && endpoints.length > 0) {
      setSelectedEndpointId(endpoints[0].id);
    }
  }, [endpoints, selectedEndpointId]);

  // Distinct tags
  const tags = useMemo(() => {
    const tSet = new Set<string>();
    endpoints.forEach((e) => tSet.add(e.tag));
    return ["All", ...Array.from(tSet)];
  }, [endpoints]);

  // Filtered endpoints
  const filteredEndpoints = useMemo(() => {
    return endpoints.filter((ep) => {
      const matchesTag = selectedTag === "All" || ep.tag === selectedTag;
      const matchesMethod = methodFilter === "ALL" || ep.method.toUpperCase() === methodFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ep.path.toLowerCase().includes(q) ||
        ep.summary.toLowerCase().includes(q) ||
        ep.tag.toLowerCase().includes(q);
      return matchesTag && matchesMethod && matchesSearch;
    });
  }, [endpoints, selectedTag, methodFilter, searchQuery]);

  // Active selected endpoint object
  const activeEndpoint = useMemo(() => {
    return endpoints.find((e) => e.id === selectedEndpointId) || filteredEndpoints[0] || endpoints[0];
  }, [endpoints, filteredEndpoints, selectedEndpointId]);

  // Default sample payload generator
  const getSamplePayload = (ep: EndpointItem) => {
    if (ep.path === "/api/v1/auth/login") {
      return JSON.stringify({ login: "admin@pencrack.com", password: "Password123!" }, null, 2);
    }
    if (ep.path === "/api/v1/auth/register") {
      return JSON.stringify(
        {
          fullName: "Amaka Obi",
          username: "amaka.reads",
          email: "amaka@example.com",
          password: "Password123!",
          isWriter: false,
        },
        null,
        2
      );
    }
    if (ep.path === "/api/v1/content" && ep.method === "post") {
      return JSON.stringify(
        {
          title: "Echoes of the Savannah",
          type: "STORY",
          categorySlug: "african-fiction",
          readTime: "7 min",
          excerpt: "The red clay roads tell stories that elders whisper only when the twilight cools...",
          bodyContent:
            "The sun dipped beneath the baobab silhouettes, painting the horizon in streaks of burnt umber and copper...",
          status: "PUBLISHED",
        },
        null,
        2
      );
    }
    if (ep.path.includes("/comments") && ep.method === "post") {
      return JSON.stringify({ commentText: "A truly captivating piece. The rhythm of your words resonates deeply." }, null, 2);
    }
    if (ep.path === "/api/v1/service-requests" && ep.method === "post") {
      return JSON.stringify(
        {
          serviceId: 1,
          customerName: "Obi Books & Media",
          customerEmail: "publisher@obibooks.com",
          customerPhone: "+2348012345678",
          budgetEstimate: "₦65,000",
          deadlineDate: "2026-11-20",
          fields: [
            { fieldName: "Manuscript Type", fieldValue: "Historical Fiction Novel" },
            { fieldName: "Target Word Count", fieldValue: "45,000 words" },
          ],
        },
        null,
        2
      );
    }
    if (ep.path === "/api/v1/gifts/initialize") {
      return JSON.stringify(
        {
          writerId: "1",
          amount: 2500,
          message: "Thank you for the inspiring story! Keep shining your light.",
        },
        null,
        2
      );
    }
    if (ep.path === "/api/v1/wallet/withdraw") {
      return JSON.stringify(
        {
          amount: 30000,
          bankName: "Guaranty Trust Bank",
          accountNumber: "0123456789",
          accountName: "Adaeze Nwosu",
        },
        null,
        2
      );
    }
    if (ep.path.startsWith("/api/v1/admin/service-requests/") && ep.method === "patch") {
      return JSON.stringify(
        {
          status: "IN_REVIEW",
          quotedAmount: 75000,
          adminNotes: "Client requested express manuscript review by lead editor.",
        },
        null,
        2
      );
    }
    if (ep.path.startsWith("/api/v1/admin/content/") && ep.method === "patch") {
      return JSON.stringify(
        {
          status: "PUBLISHED",
          isFeatured: true,
        },
        null,
        2
      );
    }
    return JSON.stringify({}, null, 2);
  };

  // Current body for active endpoint
  const currentBody =
    activeEndpoint && customBody[activeEndpoint.id] !== undefined
      ? customBody[activeEndpoint.id]
      : activeEndpoint
      ? getSamplePayload(activeEndpoint)
      : "";

  // Compute live test URL with parameter replacements
  const computeActiveUrl = () => {
    if (!activeEndpoint) return "";
    let url = activeEndpoint.path;
    const epParams = paramInputs[activeEndpoint.id] || {};
    const query = new URLSearchParams();

    if (activeEndpoint.parameters) {
      activeEndpoint.parameters.forEach((param: any) => {
        const val = epParams[param.name];
        if (param.in === "path") {
          const replacement = val || (param.name === "slug" ? "the-harmattan-letters" : param.name === "ref" ? "PC-SRV-DEMO" : "1");
          url = url.replace(`{${param.name}}`, encodeURIComponent(replacement));
        } else if (param.in === "query" && val) {
          query.append(param.name, val);
        }
      });
    }

    url = url.replace(/\{slug\}/g, "the-harmattan-letters").replace(/\{id\}/g, "1").replace(/\{ref\}/g, "PC-SRV-DEMO");
    const qs = query.toString();
    return qs ? `${url}?${qs}` : url;
  };

  // Live test executor
  const handleExecuteRequest = async () => {
    if (!activeEndpoint) return;
    setIsExecuting(true);
    setLiveResponse(null);
    const startTime = performance.now();

    try {
      const fullUrl = computeActiveUrl();
      const headers: Record<string, string> = {};

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const options: RequestInit = {
        method: activeEndpoint.method.toUpperCase(),
        headers,
      };

      if (["post", "patch", "put"].includes(activeEndpoint.method)) {
        headers["Content-Type"] = "application/json";
        if (currentBody && currentBody.trim()) {
          options.body = currentBody;
        }
      }

      const res = await fetch(fullUrl, options);
      const endTime = performance.now();
      let responseData: any;
      try {
        responseData = await res.json();
      } catch {
        responseData = { message: "Non-JSON response received" };
      }

      setLiveResponse({
        status: res.status,
        statusText: res.statusText || (res.ok ? "OK" : "Error"),
        timeMs: Math.round(endTime - startTime),
        data: responseData,
      });
    } catch (err: any) {
      const endTime = performance.now();
      setLiveResponse({
        status: 0,
        statusText: "Connection Error",
        timeMs: Math.round(endTime - startTime),
        data: null,
        error: err.message || "Failed to contact local API route",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Quick Demo Login
  const handleQuickLogin = async (role: "admin" | "writer") => {
    try {
      const payload =
        role === "admin"
          ? { login: "admin@pencrack.com", password: "Password123!" }
          : { login: "adaeze@pencrack.com", password: "Password123!" };

      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data?.token) {
        setAuthToken(json.data.token);
        setAuthRole(role);
      }
    } catch {
      // ignore
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isProtected = Boolean(activeEndpoint?.security && activeEndpoint.security.length > 0);

  return (
    <div className="w-full bg-[var(--cream)] min-h-[calc(100vh-74px)]">
      {/* ===================== DEVELOPER TOOLBAR SUB-HEADER ===================== */}
      <section className="apidocs-subbar">
        <div className="wrap apidocs-subbar-in">
          {/* Left: Brand & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-base font-serif font-bold text-[var(--brown)]">
                API Reference
              </span>
              <span className="apidocs-tag-pill font-mono text-[10px]">v1.0.0 (OAS 3.0)</span>
            </div>

            {/* Base URL Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[var(--line)] text-xs font-mono text-[var(--brown)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--muted)]">Base:</span>
              <span className="font-semibold">/api/v1</span>
              <button
                type="button"
                onClick={() => copyText("http://localhost:3000/api/v1", "base-url")}
                className="text-[var(--muted)] hover:text-[var(--brown)] ml-1 cursor-pointer"
                title="Copy Base URL"
              >
                {copiedKey === "base-url" ? "✓" : "📋"}
              </button>
            </div>
          </div>

          {/* Right: Auth & Navigation Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[var(--beige)] p-0.5 rounded-xl border border-[var(--line)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveViewMode("studio")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeViewMode === "studio"
                    ? "bg-white text-[var(--brown)] shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--brown)]"
                }`}
              >
                ⚡ API Studio
              </button>
              <button
                type="button"
                onClick={() => setActiveViewMode("schemas")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeViewMode === "schemas"
                    ? "bg-white text-[var(--brown)] shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--brown)]"
                }`}
              >
                📐 Schemas
              </button>
            </div>

            {/* 1-Click Auth helper */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-[var(--line)] text-xs">
              <span className="text-[var(--muted)] text-[11px] font-mono">Auth:</span>
              {authToken ? (
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    {authRole || "Bearer Token"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthToken("");
                      setAuthRole("");
                    }}
                    className="text-stone-400 hover:text-stone-600 text-[11px] px-1 cursor-pointer"
                    title="Clear Token"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("admin")}
                    className="px-2 py-0.5 rounded bg-[var(--beige)] hover:bg-[var(--beige-2)] text-[var(--brown)] text-[11px] font-semibold cursor-pointer"
                    title="Quick Auth as Admin"
                  >
                    👑 Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("writer")}
                    className="px-2 py-0.5 rounded bg-[var(--beige)] hover:bg-[var(--beige-2)] text-[var(--brown)] text-[11px] font-semibold cursor-pointer"
                    title="Quick Auth as Writer"
                  >
                    ✍️ Writer
                  </button>
                </div>
              )}
            </div>

            <a
              href="/api/v1/openapi.json"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex text-xs font-semibold text-[var(--brown-600)] hover:text-[var(--brown)] px-2 py-1"
            >
              OpenAPI JSON ↗
            </a>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden btn btn-soft btn-sm text-xs cursor-pointer"
            >
              ☰ Endpoints ({endpoints.length})
            </button>
          </div>
        </div>
      </section>

      {/* ===================== MAIN DEVELOPER STUDIO ===================== */}
      <div className="wrap">
        {activeViewMode === "schemas" ? (
          /* ===================== SCHEMAS & MODELS VIEW ===================== */
          <div className="py-10 space-y-8 animate-fade-in">
            <div className="max-w-2xl">
              <div className="eyebrow">Data Architecture</div>
              <h1 className="font-serif text-3xl font-bold text-[var(--brown)]">
                Relational Schemas &amp; Object Models
              </h1>
              <p className="text-[var(--muted)] text-sm mt-2">
                Type definitions and validation contracts used across Pencrack&apos;s REST endpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(openApiSpec.components.schemas).map(([name, schema]: [string, any]) => (
                <div key={name} className="apidocs-card p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <span className="font-mono font-bold text-sm text-[var(--brown)]">{name}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--beige)] text-[var(--brown-600)]">
                      {schema.type || "object"}
                    </span>
                  </div>

                  {schema.properties && (
                    <div className="space-y-2 pt-1 text-xs">
                      {Object.entries(schema.properties).map(([prop, propDef]: [string, any]) => (
                        <div
                          key={prop}
                          className="flex items-start justify-between py-1.5 border-b border-[#f3ece3] font-mono text-[11px]"
                        >
                          <span className="font-semibold text-[var(--ink)]">
                            {prop}{" "}
                            {schema.required?.includes(prop) && (
                              <span className="text-rose-500 font-bold" title="Required">
                                *
                              </span>
                            )}
                          </span>
                          <span className="text-[var(--muted)] text-[10px]">
                            {propDef.type}
                            {propDef.format ? ` (${propDef.format})` : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ===================== STUDIO VIEW (MASTER - DETAIL) ===================== */
          <div className="apidocs-layout">
            {/* ========== LEFT SIDEBAR: CATEGORIES & ENDPOINT INDEX ========== */}
            <aside className={`apidocs-sidebar ${mobileDrawerOpen ? "mobile-open" : ""}`}>
              {/* Mobile Drawer Close */}
              {mobileDrawerOpen && (
                <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] lg:hidden">
                  <span className="font-serif font-bold text-base text-[var(--brown)]">API Directory</span>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-lg text-[var(--muted)] hover:text-[var(--brown)] text-lg"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Instant Search Bar */}
              <div className="apidocs-search">
                <span className="apidocs-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Filter endpoints or paths..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-xs text-[var(--muted)] hover:text-[var(--brown)]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Method Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {["ALL", "GET", "POST", "PATCH", "DELETE"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethodFilter(m)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      methodFilter === m
                        ? "bg-[var(--brown)] text-white shadow-xs"
                        : "bg-white text-[var(--muted)] border border-[var(--line)] hover:text-[var(--brown)]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Categorized Endpoint Accordions */}
              <div className="space-y-4">
                {tags
                  .filter((t) => t !== "All")
                  .map((tag) => {
                    const tagEndpoints = filteredEndpoints.filter((e) => e.tag === tag);
                    if (tagEndpoints.length === 0) return null;

                    return (
                      <div key={tag} className="space-y-1">
                        <div className="apidocs-cat-title">
                          <span>{tag}</span>
                          <span className="text-[10px] font-mono">{tagEndpoints.length}</span>
                        </div>

                        <div className="space-y-0.5">
                          {tagEndpoints.map((ep) => {
                            const isSelected = activeEndpoint?.id === ep.id;
                            const methodClass =
                              ep.method === "get"
                                ? "apidocs-method-get"
                                : ep.method === "post"
                                ? "apidocs-method-post"
                                : ep.method === "patch"
                                ? "apidocs-method-patch"
                                : "apidocs-method-delete";

                            return (
                              <button
                                key={ep.id}
                                type="button"
                                onClick={() => {
                                  setSelectedEndpointId(ep.id);
                                  setMobileDrawerOpen(false);
                                  setLiveResponse(null);
                                }}
                                className={`apidocs-nav-link ${isSelected ? "active" : ""}`}
                              >
                                <span className={`apidocs-method ${methodClass}`}>{ep.method}</span>
                                <span className="truncate flex-1 font-mono text-[11px]">{ep.path}</span>
                                {ep.security && ep.security.length > 0 && (
                                  <span className="text-[10px] opacity-70" title="Protected">
                                    🔒
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </aside>

            {/* ========== RIGHT: FOCUSED INTERACTIVE STUDIO ========== */}
            <main className="min-w-0 space-y-6">
              {activeEndpoint ? (
                <>
                  {/* Endpoint Header Card */}
                  <div className="apidocs-card p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`apidocs-method text-xs px-3 py-1 font-mono uppercase ${
                            activeEndpoint.method === "get"
                              ? "apidocs-method-get"
                              : activeEndpoint.method === "post"
                              ? "apidocs-method-post"
                              : activeEndpoint.method === "patch"
                              ? "apidocs-method-patch"
                              : "apidocs-method-delete"
                          }`}
                        >
                          {activeEndpoint.method}
                        </span>

                        <span className="font-mono text-base sm:text-lg font-bold text-[var(--brown)]">
                          {activeEndpoint.path}
                        </span>

                        {isProtected ? (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 font-mono">
                            🔒 Bearer JWT Required
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 font-mono">
                            🌐 Public Route
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--muted)] uppercase font-mono">
                          {activeEndpoint.tag}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyText(`http://localhost:3000${activeEndpoint.path}`, activeEndpoint.id)}
                          className="btn btn-ghost btn-sm text-xs py-1.5 px-3 cursor-pointer"
                        >
                          {copiedKey === activeEndpoint.id ? "✓ Copied" : "Copy Path"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[var(--brown)]">
                        {activeEndpoint.summary}
                      </h2>
                      {activeEndpoint.description && (
                        <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-1">
                          {activeEndpoint.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Master Playground: Parameters & Live Code Console */}
                  <div className="apidocs-playground-grid">
                    {/* Left Pane: Documentation & Input Parameters */}
                    <div className="space-y-6">
                      {/* Path / Query Parameters */}
                      {activeEndpoint.parameters && activeEndpoint.parameters.length > 0 && (
                        <div className="apidocs-card p-5 space-y-3">
                          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brown)]">
                              Route Parameters
                            </span>
                            <span className="text-[11px] text-[var(--muted)]">
                              {activeEndpoint.parameters.length} parameter(s)
                            </span>
                          </div>

                          <div className="space-y-3 pt-1">
                            {activeEndpoint.parameters.map((p: any) => (
                              <div key={p.name} className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-mono font-bold text-[var(--brown)]">
                                    {p.name}{" "}
                                    {p.required && (
                                      <span className="text-rose-600 font-bold" title="Required">
                                        *
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[10px] font-mono text-[var(--muted)] uppercase">
                                    in: {p.in} • {p.schema?.type || "string"}
                                  </span>
                                </div>

                                <input
                                  type="text"
                                  placeholder={
                                    p.name === "slug"
                                      ? "the-harmattan-letters"
                                      : p.name === "id"
                                      ? "1"
                                      : p.name === "ref"
                                      ? "PC-SRV-20261008-DEMO01"
                                      : "Enter value..."
                                  }
                                  value={paramInputs[activeEndpoint.id]?.[p.name] || ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setParamInputs((prev) => ({
                                      ...prev,
                                      [activeEndpoint.id]: {
                                        ...(prev[activeEndpoint.id] || {}),
                                        [p.name]: val,
                                      },
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-[var(--cream)] border border-[var(--line)] rounded-xl font-mono text-xs text-[var(--brown)] focus:outline-none focus:border-[var(--brown)]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Request Body Payload */}
                      {["post", "patch", "put"].includes(activeEndpoint.method) && (
                        <div className="apidocs-card p-5 space-y-3">
                          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brown)]">
                              Request Body (JSON)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setCustomBody((prev) => ({
                                    ...prev,
                                    [activeEndpoint.id]: getSamplePayload(activeEndpoint),
                                  }))
                                }
                                className="text-[11px] text-[var(--brown-600)] hover:text-[var(--brown)] font-semibold cursor-pointer"
                              >
                                Reset Sample
                              </button>
                            </div>
                          </div>

                          <textarea
                            rows={7}
                            value={currentBody}
                            onChange={(e) =>
                              setCustomBody((prev) => ({
                                ...prev,
                                [activeEndpoint.id]: e.target.value,
                              }))
                            }
                            className="w-full p-3 font-mono text-xs bg-[var(--cream)] border border-[var(--line)] rounded-xl text-[var(--ink)] focus:outline-none focus:border-[var(--brown)] leading-relaxed resize-y"
                          />
                        </div>
                      )}

                      {/* Expected Response Codes */}
                      {activeEndpoint.responses && (
                        <div className="apidocs-card p-5 space-y-3">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brown)] block border-b border-[var(--line)] pb-2.5">
                            Status Codes &amp; Contracts
                          </span>

                          <div className="space-y-2 pt-1">
                            {Object.entries(activeEndpoint.responses).map(([code, r]: [string, any]) => (
                              <div
                                key={code}
                                className="flex items-start gap-3 p-2.5 rounded-xl border border-[var(--line)] bg-[var(--cream)] text-xs"
                              >
                                <span
                                  className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                                    code.startsWith("2")
                                      ? "bg-emerald-100 text-emerald-800"
                                      : code.startsWith("4")
                                      ? "bg-rose-100 text-rose-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {code}
                                </span>
                                <span className="text-[var(--brown-700)] flex-1">{r.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Pane: Code Generator & Live Interactive Sandbox */}
                    <div className="apidocs-console-card">
                      {/* Console Top Bar */}
                      <div className="apidocs-console-header">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveCodeTab("curl")}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                              activeCodeTab === "curl"
                                ? "bg-[#382b20] text-amber-200 font-bold"
                                : "text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            cURL
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCodeTab("fetch")}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                              activeCodeTab === "fetch"
                                ? "bg-[#382b20] text-amber-200 font-bold"
                                : "text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            JavaScript
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCodeTab("python")}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                              activeCodeTab === "python"
                                ? "bg-[#382b20] text-amber-200 font-bold"
                                : "text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            Python
                          </button>
                        </div>

                        {/* Execute Button */}
                        <button
                          type="button"
                          onClick={handleExecuteRequest}
                          disabled={isExecuting}
                          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                        >
                          {isExecuting ? (
                            <>
                              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>▶</span>
                              <span>Send Request</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Snippets Block */}
                      <div className="p-4 space-y-4">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              const snippet =
                                activeCodeTab === "curl"
                                  ? `curl -X ${activeEndpoint.method.toUpperCase()} "http://localhost:3000${computeActiveUrl()}"${
                                      authToken ? ` -H "Authorization: Bearer ${authToken}"` : ""
                                    }${
                                      ["post", "patch"].includes(activeEndpoint.method)
                                        ? ` -H "Content-Type: application/json" -d '${currentBody.replace(/\n/g, "")}'`
                                        : ""
                                    }`
                                  : `const res = await fetch("http://localhost:3000${computeActiveUrl()}", { method: "${activeEndpoint.method.toUpperCase()}" });`;
                              copyText(snippet, "snippet");
                            }}
                            className="absolute right-3 top-3 text-[10px] font-mono px-2 py-1 rounded bg-[#2a2018] text-stone-300 hover:text-white border border-[#423326] cursor-pointer"
                          >
                            {copiedKey === "snippet" ? "✓ Copied" : "Copy"}
                          </button>

                          <pre className="apidocs-code-block text-[11px] whitespace-pre-wrap max-h-56 overflow-y-auto">
                            {activeCodeTab === "curl" && (
                              <code className="text-amber-200">
{`curl -X ${activeEndpoint.method.toUpperCase()} "http://localhost:3000${computeActiveUrl()}" \\
  -H "Accept: application/json"${
    authToken ? ` \\\n  -H "Authorization: Bearer ${authToken}"` : ""
  }${
    ["post", "patch"].includes(activeEndpoint.method)
      ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${currentBody.replace(/\n/g, "")}'`
      : ""
  }`}
                              </code>
                            )}

                            {activeCodeTab === "fetch" && (
                              <code className="text-emerald-300">
{`const res = await fetch("http://localhost:3000${computeActiveUrl()}", {
  method: "${activeEndpoint.method.toUpperCase()}",
  headers: {
    "Accept": "application/json",${
      authToken ? `\n    "Authorization": "Bearer ${authToken}",` : ""
    }${
      ["post", "patch"].includes(activeEndpoint.method)
        ? `\n    "Content-Type": "application/json",`
        : ""
    }
  },${
    ["post", "patch"].includes(activeEndpoint.method)
      ? `\n  body: JSON.stringify(${currentBody.replace(/\n/g, "")})`
      : ""
  }
});

const data = await res.json();
console.log(data);`}
                              </code>
                            )}

                            {activeCodeTab === "python" && (
                              <code className="text-cyan-300">
{`import requests

url = "http://localhost:3000${computeActiveUrl()}"
headers = {
    "Accept": "application/json",${
      authToken ? `\n    "Authorization": "Bearer ${authToken}",` : ""
    }
}
${
  ["post", "patch"].includes(activeEndpoint.method)
    ? `payload = ${currentBody}\nresponse = requests.${activeEndpoint.method}(url, json=payload, headers=headers)`
    : `response = requests.${activeEndpoint.method}(url, headers=headers)`
}

print(response.json())`}
                              </code>
                            )}
                          </pre>
                        </div>

                        {/* Live Server Response Display */}
                        <div className="pt-3 border-t border-[#362920] space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-stone-400 font-semibold uppercase tracking-wider text-[11px]">
                              Server Response
                            </span>
                            {liveResponse && (
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                    liveResponse.status >= 200 && liveResponse.status < 300
                                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                      : "bg-rose-950 text-rose-400 border border-rose-800"
                                  }`}
                                >
                                  {liveResponse.status} {liveResponse.statusText}
                                </span>
                                <span className="font-mono text-stone-400 text-[10px]">
                                  {liveResponse.timeMs}ms
                                </span>
                              </div>
                            )}
                          </div>

                          {liveResponse ? (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  copyText(JSON.stringify(liveResponse.data, null, 2), "response-json")
                                }
                                className="absolute right-3 top-3 text-[10px] font-mono px-2 py-1 rounded bg-[#2a2018] text-stone-300 hover:text-white border border-[#423326] cursor-pointer"
                              >
                                {copiedKey === "response-json" ? "✓ Copied" : "Copy JSON"}
                              </button>

                              <pre className="apidocs-code-block text-[11px] whitespace-pre-wrap max-h-64 overflow-y-auto text-stone-200">
                                {JSON.stringify(liveResponse.data, null, 2)}
                              </pre>
                            </div>
                          ) : (
                            <div className="p-8 text-center border border-dashed border-[#362920] rounded-xl text-stone-500 font-mono text-xs">
                              Click &quot;Send Request&quot; above to execute against the live API.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="apidocs-card p-12 text-center space-y-3">
                  <span className="text-3xl">🔍</span>
                  <h3 className="font-serif text-xl font-bold text-[var(--brown)]">No endpoints match your filter</h3>
                  <p className="text-xs text-[var(--muted)]">Try resetting the search bar or method filters.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setMethodFilter("ALL");
                      setSelectedTag("All");
                    }}
                    className="btn btn-soft btn-sm mx-auto"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
