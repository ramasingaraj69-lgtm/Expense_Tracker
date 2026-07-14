import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import FeatureCard from "../components/FeatureCard";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <motion.div initial={{opacity:0}}

animate={{opacity:1}}

transition={{duration:.8}}

className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#F8F4EF] to-[#EFE4D2] overflow-hidden relative"

>

      <Navbar />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

  <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-[#C89B5E]/10 blur-3xl animate-pulse"></div>

  <div className="absolute top-[40%] right-10 h-96 w-96 rounded-full bg-[#8B5E3C]/10 blur-3xl animate-pulse"></div>

  <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#EADCC8]/60 blur-3xl"></div>

</div>

      <Hero />

      {/* Stats */}

      <section className="relative -mt-28 z-20 px-6">

        <div className="max-w-[1400px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{duration: .9,staggerChildren: .2,}}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >

            <StatsCard
              title="Total Balance"
              value="₹42,560"
              color="text-[#6F4E37]"
            />

            <StatsCard
              title="Expenses"
              value="₹15,000"
              color="text-red-700"
            />

            <StatsCard
              title="Savings"
              value="₹27,560"
              color="text-green-700"
            />

          </motion.div>

        </div>

      </section>

      {/* Features */}

      <section className="relative py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#C89B5E] to-[#6F4E37]"></div>

            <p className="uppercase tracking-[4px] text-[#8B5E3C] font-semibold">

              Features

            </p>

            <h2 className="mt-4 text-5xl font-bold text-[#2D1B14]">

              Manage Money Like Never Before

            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-[#7B5E4A] text-lg leading-8">

             Stay in control of every rupee with beautifully organized expenses,
smart budgeting tools, insightful analytics, and an elegant dashboard
designed to simplify your financial journey.

            </p>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{staggerChildren:.18,delayChildren:.2}}
           className= "grid gap-10 md:grid-cols-2 xl:grid-cols-4"
          >

            <FeatureCard
              icon="💰"
              title="Add Expense"
              description="Quickly record every expense with a clean and simple interface."
            />

            <FeatureCard
              icon="📋"
              title="View History"
              description="Access all your transactions with organized and searchable records."
            />

            <FeatureCard
              icon="📊"
              title="Track Budget"
              description="Monitor your monthly spending and stay within your planned budget."
            />

            <FeatureCard
              icon="🛡️"
              title="Secure Data"
              description="Your financial records are stored securely and are always available."
            />

          </motion.div>

        </div>

      </section>

      {/* CTA */}

      <section className="relative px-6 pb-28">

        <div className="max-w-7xl mx-auto">

          <CTA />

        </div>

      </section>

      <Footer />

    </motion.div>
  );
}

export default Home;