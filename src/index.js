const express = require("express");
const { saveUrl, getUrl, getAll } = require("./store");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Health check (important for K8s probes)
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "url-shortener",
        timestamp: new Date()
    });
});

/**
 * Create short URL
 */
app.post("/shorten", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const code = saveUrl(url);

    res.status(201).json({
        shortUrl: `http://localhost:${PORT}/${code}`,
        code
    });
});

/**
 * Redirect
 */
app.get("/:code", (req, res) => {
    const originalUrl = getUrl(req.params.code);

    if (!originalUrl) {
        return res.status(404).json({ error: "Not found" });
    }

    res.redirect(originalUrl);
});

/**
 * Debug endpoint (useful for monitoring/testing)
 */
app.get("/admin/urls", (req, res) => {
    res.json(getAll());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
