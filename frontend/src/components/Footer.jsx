import { FaWallet, FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-br from-[#2D1B14] via-[#4A2C2A] to-[#6F4E37] text-white">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4 transition-all duration-300 hover:scale-105">

              <div className="w-12 h-12 rounded-2xl bg-[#F8F4EF] text-[#e2af8a] flex items-center justify-center text-xl shadow-lg">

                <FaWallet />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-[#e2af8a]">

                  Expense Tracker

                </h2>

                <p className="text-[#EADFD3] text-sm">

                  Smart Finance Management

                </p>

              </div>

            </div>

            <p className="mt-5 text-[#F5E8DD] leading-7">

              Track every rupee, monitor your budget, and
              achieve your financial goals with a beautiful
              and modern expense tracking experience.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              Quick Links

            </h3>

            <ul className="space-y-3 text-[#e2af8a]">

              <li>
                <a href="/home" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/expenses" className="hover:text-white transition">
                  Expenses
                </a>
              </li>

              <li>
                <a href="/profile" className="hover:text-white transition">
                  Profile
                </a>
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              Connect

            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-[#C89B5E] hover:text-[#2D1B14] hover:shadow-xl"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-[#C89B5E] hover:text-[#2D1B14] hover:shadow-xl"
              >
                <FaLinkedin size={20} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-[#EADFD3] text-sm">

          <p>

            © 2026 Expense Tracker. All Rights Reserved.

          </p>

          <p className="flex items-center gap-2 mt-4 md:mt-0">

            Made with

            <FaHeart className="text-red-400" />

            using React, Tailwind CSS & Django

          </p>

        </div>
<div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#C89B5E]/50 to-transparent"></div>
      </div>

    </footer>
  );
}

export default Footer;