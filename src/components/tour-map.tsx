"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  stages,
  stageTypeColors,
  stageTypeLabels,
  formatStageDate,
} from "@/lib/stages";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function TourMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    let cancelled = false;

    const map = L.map(mapRef.current, {
      center: [46.0, 3.0],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
    });

    // Create a custom pane for the France overlay (between tiles at 200 and overlays at 400)
    map.createPane("francePane");
    map.getPane("francePane")!.style.zIndex = "250";

    // Dark map tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 18 }
    ).addTo(map);

    // Country highlights (yellow) — local files, no CORS issues
    const countryStyle: L.PathOptions = {
      fillColor: "#facc15",
      fillOpacity: 0.15,
      color: "#facc15",
      weight: 2,
      opacity: 0.5,
    };

    ["/france.geo.json", "/catalonia.geo.json"].forEach((url) => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((geoData) => {
          if (cancelled) return;
          L.geoJSON(geoData, {
            pane: "francePane",
            style: countryStyle,
            interactive: false,
          }).addTo(map);
        })
        .catch((err) => {
          if (!cancelled) console.error(`[TourMap] ${url} failed:`, err);
        });
    });

    // Zoom control top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Attribution bottom-right
    L.control
      .attribution({ position: "bottomright" })
      .addAttribution(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      )
      .addTo(map);

    // Draw route polyline connecting stages
    const routeCoords: L.LatLngExpression[] = stages.map((s) => [s.lat, s.lng]);
    L.polyline(routeCoords, {
      color: "#f59e0b",
      weight: 3,
      opacity: 0.5,
      dashArray: "8 6",
    }).addTo(map);

    // Add stage markers
    stages.forEach((stage) => {
      const color = stageTypeColors[stage.type] || "#888";
      const typeLabel = stageTypeLabels[stage.type] || stage.type;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width: 32px; height: 32px; border-radius: 50%;
          background: ${color}; border: 2px solid rgba(255,255,255,0.9);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer; transition: transform 0.2s;
        " onmouseenter="this.style.transform='scale(1.3)'"
           onmouseleave="this.style.transform='scale(1)'"
        >${stage.stage}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([stage.lat, stage.lng], { icon }).addTo(map);

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 220px; padding: 4px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="
              display: inline-flex; align-items: center; justify-content: center;
              width: 28px; height: 28px; border-radius: 50%;
              background: ${color}; color: white; font-weight: 700; font-size: 12px;
            ">${stage.stage}</span>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #f5f5f5;">Stage ${stage.stage}</div>
              <div style="font-size: 11px; color: #a1a1aa;">${formatStageDate(stage.date)}</div>
            </div>
          </div>
          <div style="font-size: 13px; color: #d4d4d8; margin-bottom: 6px;">
            ${stage.start} \u2192 ${stage.finish}
          </div>
          <div style="display: flex; gap: 12px; font-size: 12px; color: #a1a1aa;">
            <span><strong style="color: #e4e4e7;">${stage.distance_km}</strong> km</span>
            <span style="
              display: inline-flex; align-items: center; gap: 4px;
              padding: 1px 8px; border-radius: 9999px;
              background: ${color}22; color: ${color}; font-weight: 500;
              border: 1px solid ${color}44;
            ">${typeLabel}</span>
          </div>
          <div style="margin-top: 10px; font-size: 11px; color: #a1a1aa; text-align: center;">
            Click to view details
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: "tour-popup",
        closeButton: false,
        offset: [0, -8],
      });

      marker.on("mouseover", () => marker.openPopup());
      marker.on("click", () => router.push(`/${langRef.current}/stage/${stage.stage}`));
    });

    mapInstance.current = map;

    return () => {
      cancelled = true;
      map.remove();
      mapInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalDistance = stages.reduce((sum, s) => sum + s.distance_km, 0);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            Tour de France 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Tour Route
          </h1>
          <p className="text-base text-zinc-400 mt-3">
            21 stages across 3,500&nbsp;km — from Barcelona to Paris.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {Object.entries(stageTypeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="size-3 rounded-full"
                style={{ background: stageTypeColors[key] }}
              />
              <span className="text-xs text-zinc-400 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="flex-1 min-h-[600px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/40">
          <div ref={mapRef} className="w-full h-full min-h-[600px]" />
        </div>

        {/* Stages table */}
        <div className="mt-10 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            All 21 Stages
          </h2>
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-800/30">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-zinc-400 w-20">Stage</TableHead>
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Route</TableHead>
                  <TableHead className="text-zinc-400 text-right">Distance</TableHead>
                  <TableHead className="text-zinc-400">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stages.map((stage) => {
                  const color = stageTypeColors[stage.type] || "#888";
                  const typeLabel = stageTypeLabels[stage.type] || stage.type;
                  return (
                    <TableRow
                      key={stage.stage}
                      className="border-white/5 hover:bg-white/[0.03] transition-colors"
                    >
                      <TableCell>
                        <Link
                          href={`/${lang}/stage/${stage.stage}`}
                          className="inline-flex items-center justify-center size-8 rounded-full text-xs font-bold text-white"
                          style={{ background: color }}
                        >
                          {stage.stage}
                        </Link>
                      </TableCell>
                      <TableCell className="text-zinc-300 text-sm">
                        {formatStageDate(stage.date)}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/${lang}/stage/${stage.stage}`}
                          className="text-zinc-100 hover:text-white font-medium transition-colors"
                        >
                          {stage.start} → {stage.finish}
                        </Link>
                      </TableCell>
                      <TableCell className="text-zinc-300 text-sm text-right tabular-nums">
                        {stage.distance_km} km
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${color}18`,
                            color: color,
                            border: `1px solid ${color}44`,
                          }}
                        >
                          {typeLabel}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* Total row */}
                <TableRow className="border-white/5 bg-white/[0.02]">
                  <TableCell />
                  <TableCell />
                  <TableCell className="text-zinc-400 font-semibold text-sm">Total</TableCell>
                  <TableCell className="text-amber-400 font-bold text-sm text-right tabular-nums">
                    {totalDistance.toLocaleString()} km
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Custom popup styles */}
      <style jsx global>{`
        .tour-popup .leaflet-popup-content-wrapper {
          background: #1c1c22;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          padding: 0;
        }
        .tour-popup .leaflet-popup-content {
          margin: 12px 16px;
          line-height: 1.5;
        }
        .tour-popup .leaflet-popup-tip {
          background: #1c1c22;
          border: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}
