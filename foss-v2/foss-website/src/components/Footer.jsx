export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 md:px-10 pt-16 pb-8 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-white/50 flex items-center justify-center text-[10px] font-bold">F</div>
              <span className="text-sm tracking-[0.3em] uppercase">FOSS</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl uppercase leading-none">
              Sound<br />& Speed
            </h3>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label mb-3">Menu</div>
            <ul className="space-y-1.5 text-xs text-white/50">
              <li><a href="#story" className="hover:text-white transition">About</a></li>
              <li><a href="#tickets" className="hover:text-white transition">Tickets</a></li>
              <li><a href="#venue" className="hover:text-white transition">Venue</a></li>

            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label mb-3">Contact</div>
            <ul className="space-y-1.5 text-xs text-white/50">
              <li><a href="tel:+917019033669" className="hover:text-white transition">+91 70190 33669</a></li>
       
              <li>Bengaluru, IN</li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="label mb-3">Follow</div>
            <ul className="space-y-1.5 text-xs text-white/50">
              <li><a href="https://instagram.com/foss.in" className="hover:text-white transition">Instagram ↗</a></li>
              {/* <li><a href="#" className="hover:text-white transition">YouTube ↗</a></li> */}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-6 border-t border-white/8 label">
          <span>© 2026 FOSS · Motorsport Inc.</span>
          <span>Festival of Sound & Speed</span>
        </div>
      </div>
    </footer>
  );
}