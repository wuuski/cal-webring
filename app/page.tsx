import { members } from "../members";
import RingGraph from "./RingGraph";

export default function HomePage() {
  return (
    <main>
      <div className="relative max-w-2xl mx-auto p-8">
      <div className="sticky top-0 z-20 pointer-events-none">
  <div
    className="absolute left-0 right-0 top-[220px] h-32 z-0"
    style={{
      background: "linear-gradient(to bottom, #fdf6e3 0%, transparent 100%)",
    }}
    
  />
  <div
  className="absolute left-0 right-0 top-0 h-[220px] z-0"
  style={{ backgroundColor: "#fdf6e3" }}
/>
  <img
    src="/gate.png"
    alt=""
    className="relative z-10 w-full max-w-2xl mx-auto block"
  />
</div>

        <div className="relative z-10 -mt-[380px] max-w-md mx-auto text-center px-16">
          <h1 className="text-3xl font-bold text-[#003262] mb-2">
            UC Berkeley Webring
          </h1>
          <p className="text-sm text-gray-700">
            A webring connecting the personal websites and portfolios of
            Berkeley students, alumni, and faculty.
          </p>
          <p className="text-base text-gray-600 mb-8 max-w-xl">
            A webring is an old-school way of connecting personal websites —
            each site links to the next and previous one in the ring, so you
            can click through a whole community of pages instead of relying
            on search engines. Want to join?{" "}
            
            <a  href="https://github.com/wuuski/cal-webring"
              className="underline text-[#064077] hover:text-[#B8860B] transition-colors"
            >
              Fork the repo and open a pull request
            </a>
            .
          </p>
        </div>

        <div className="relative z-10 max-w-md mx-auto px-8 pb-16 -translate-x-14">
          <h2 className="text-2xl font-semibold text-[#003262] mb-4 text-center translate-x-14">
            Members
          </h2>
          <table className="border-collapse w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left pr-4 pb-2">Name</th>
                <th className="text-left pr-4 pb-2">Major</th>
                <th className="text-left pr-4 pb-2">Year</th>
                <th className="text-left pb-2">Site Link</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.url} className="border-b">
                  <td className="pr-4 py-2">
                    
                    <a  href={member.url}
                      className="hover:text-[#B8860B] transition-colors"
                    >
                      {member.name}
                    </a>
                  </td>
                  <td className="pr-4 py-2">{member.major}</td>
                  <td className="pr-4 py-2">{member.year}</td>
                  <td className="py-2">
                    
                    <a  href={member.url}
                      className="underline text-[#064077] hover:text-[#B8860B] transition-colors"
                    >
                      {member.url.replace(/^https?:\/\//, "")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="hidden lg:block fixed top-50 right-8 w-[350px]">
        <RingGraph />
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        className="mt-8 mb-16"
      >
        <a href="https://calwebring.com/prev?current=YOUR_URL_HERE">←</a>
        <a href="https://calwebring.com">
          <img src="https://calwebring.com/badge.png" width="36" />
        </a>
        <a href="https://calwebring.com/next?current=YOUR_URL_HERE">→</a>
      </div>
    </main>
  );
}