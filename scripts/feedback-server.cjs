#!/usr/bin/env node

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const PORT = Number(process.env.FEEDBACK_PORT || 8787);
const HOST = process.env.FEEDBACK_HOST || "127.0.0.1";
const DATA_DIR = process.env.FEEDBACK_DATA_DIR || path.join(process.cwd(), "feedback-data");
const DATA_FILE = path.join(DATA_DIR, "feedback.json");

function ensureStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]\n");
}

function readEntries() {
  ensureStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function writeEntries(entries) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(entries, null, 2)}\n`);
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": process.env.FEEDBACK_ALLOW_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Accept",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8 * 1024 * 1024) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function normalizeDraft(input) {
  return {
    module: String(input.module || "其他"),
    pageName: String(input.pageName || input.pagePath || "未命名页面"),
    pagePath: String(input.pagePath || "/"),
    detail: String(input.detail || "").trim(),
    screenshots: Array.isArray(input.screenshots) ? input.screenshots.slice(0, 3) : [],
    submitDate: String(input.submitDate || new Date().toISOString().slice(0, 10)),
    status: input.status === "resolved" ? "resolved" : "pending",
    submitter: input.submitter ? String(input.submitter) : undefined,
    note: input.note ? String(input.note) : undefined,
  };
}

function createEntry(draft) {
  return {
    ...draft,
    id: `fb-${Date.now()}-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || `${HOST}:${PORT}`}`);
  const pathname = url.pathname.replace(/\/$/, "") || "/";

  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname !== "/api/feedback" && !pathname.startsWith("/api/feedback/")) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  try {
    if (req.method === "GET" && pathname === "/api/feedback") {
      sendJson(res, 200, { items: readEntries() });
      return;
    }

    if (req.method === "POST" && pathname === "/api/feedback") {
      const draft = normalizeDraft(await readJson(req));
      if (!draft.detail) {
        sendJson(res, 400, { error: "detail is required" });
        return;
      }
      const entry = createEntry(draft);
      writeEntries([entry, ...readEntries()]);
      sendJson(res, 201, entry);
      return;
    }

    if (req.method === "DELETE" && pathname === "/api/feedback") {
      writeEntries([]);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/feedback/")) {
      const id = decodeURIComponent(pathname.slice("/api/feedback/".length));
      writeEntries(readEntries().filter((entry) => entry.id !== id));
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/feedback/")) {
      const id = decodeURIComponent(pathname.slice("/api/feedback/".length));
      const payload = await readJson(req);
      const status = payload.status === "resolved" ? "resolved" : "pending";
      const entries = readEntries().map((entry) => entry.id === id ? { ...entry, status } : entry);
      writeEntries(entries);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "Unknown error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Feedback API listening at http://${HOST}:${PORT}/api/feedback`);
  console.log(`Feedback data file: ${DATA_FILE}`);
});
