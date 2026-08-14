"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { members } from "../members";

export default function RingGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 700;
    const height = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const nodes = members.map((m) => ({ ...m }));
    const links = nodes.map((node, i) => ({
      source: node.url,
      target: nodes[(i + 1) % nodes.length].url,
    }));

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3.forceLink(links as any).id((d: any) => d.url).distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(40));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#FDB515")
      .attr("stroke-width", 2);

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (_, d: any) => window.open(d.url, "_blank"));

    node.append("circle").attr("r", 10).attr("fill", "#003262");

    node
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", 24)
      .attr("font-size", 11)
      .attr("fill", "#0d1b2a");

      const padding = 30;

      simulation.on("tick", () => {
        nodes.forEach((d: any) => {
          d.x = Math.max(padding, Math.min(width - padding, d.x));
          d.y = Math.max(padding, Math.min(height - padding, d.y));
        });
      
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);
      
        node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
      });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 700 500" className="w-full h-auto" />
  );
}