const express = require("express");
const geoip = require("geoip-lite");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/lookup", (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({ error: "Missing IP parameter" });
    }

    const geo = geoip.lookup(ip);
    if (!geo) {
        return res.status(404).json({ error: "Geo data not found" });
    }

    res.json({
        ip,
        country: geo.country,
        region: geo.region,
        city: geo.city,
        lat: geo.ll?.[0],
        lon: geo.ll?.[1],
        timezone: geo.timezone,
    });
});

app.get("/", (req, res) => {
    res.send("✅ GeoIP API is running. Use /lookup?ip=...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});