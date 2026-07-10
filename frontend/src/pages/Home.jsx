import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import FeatureCard from "../components/FeatureCard";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#F8F4EF]">

      <Navbar />

      <Hero />

      {/* Stats */}

      <section className="relative -mt-20 z-20 px-6">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[4px] text-[#8B5E3C] font-semibold">

              Features

            </p>

            <h2 className="mt-4 text-5xl font-bold text-[#2D1B14]">

              Everything You Need

            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-[#7B5E4A] text-lg leading-8">

              Manage your daily expenses, monitor your spending,
              and stay on top of your financial goals with an
              elegant and intuitive dashboard.

            </p>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
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

      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <CTA />

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Home;